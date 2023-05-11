package com.project.smg.member.service;

import com.project.smg.mandalart.entity.BigGoal;
import com.project.smg.mandalart.entity.SmallGoal;
import com.project.smg.mandalart.entity.Title;
import com.project.smg.mandalart.repository.TitleRepository;
import com.project.smg.mandalart.service.MandalartLikeService;
import com.project.smg.member.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {
    private final TitleRepository titleRepository;
    private final MandalartLikeService mandalartLikeService;

    private Title getTitle(String memberId) {
        return titleRepository.findTopByMemberIdAndClearAtIsNullOrderByCreatedAtDesc(memberId)
                .orElse(null);
    }

    private List<BigGoal> getBigGoalList(Title title) {
        return Optional.ofNullable(title)
                .map(Title::getBigGoals)
                .orElse(Collections.emptyList());
    }

    private List<SmallGoal> getSmallGoalList(List<BigGoal> bigGoalList) {
        return bigGoalList.stream()
                .flatMap(bg -> bg.getSmallGoals().stream())
                .collect(Collectors.toList());
    }

    @Override
    public NowGoalDto NowGoalDto(String memberId) {
        Title title = getTitle(memberId);

        if (title == null)
            return null;

        String titleName = title.getContent();
        List<BigGoal> bigGoalList = getBigGoalList(title);
        List<SmallGoal> smallGoalList = getSmallGoalList(bigGoalList);

        double ratio = smallGoalList.stream()
                .filter(sg -> sg.getClearAt() != null)
                .count() / (double) smallGoalList.stream().count();

        int roundedRatio = (int) Math.round(ratio * 10000) / 100;

        NowGoalDto nowGoalDto = NowGoalDto.builder()
                .title(titleName)
                .rate(roundedRatio)
                .build();

        return nowGoalDto;
    }

    @Override
    public List<NowBigGoalDto> NowBigList(String memberId) {
        List<BigGoal> bigGoalList = getBigGoalList(getTitle(memberId));

        if (bigGoalList.isEmpty())
            return Collections.emptyList();

        List<NowBigGoalDto> nowBigGoalDtoList = bigGoalList.stream()
                .map(bigGoal -> new NowBigGoalDto(
                        bigGoal.getContent(),
                        bigGoal.getClearAt() != null))
                .collect(Collectors.toList());

        return nowBigGoalDtoList;
    }

    @Override
    public List<ClearDto> ClearList(String memberId) {
        Title title = getTitle(memberId);

        if (title == null)
            return Collections.emptyList();

        List<BigGoal> bigGoalList = getBigGoalList(title);
        List<SmallGoal> smallGoalList = getSmallGoalList(bigGoalList);

        List<ClearDto> clearDtoList = Stream.concat(
                        bigGoalList.stream().filter(goal -> goal.getClearAt() != null)
                                .map(goal -> new ClearDto(goal.getContent(), goal.getClearAt())),
                        smallGoalList.stream().filter(goal -> goal.getClearAt() != null)
                                .map(goal -> new ClearDto(goal.getContent(), goal.getClearAt())))
                .collect(Collectors.toCollection(ArrayList::new));

        if (title.getClearAt() != null) {
            ClearDto clearDto = new ClearDto(title.getContent(), title.getClearAt());
            clearDtoList.add(clearDto);
        }

        clearDtoList.sort(Comparator.comparing(ClearDto::getClearAt).reversed());

        return clearDtoList;
    }

    @Override
    public List<ClearMandalartDto> ClearMandalartList(String memberId) {
        List<Title> clearTitleList = titleRepository.findByMemberIdAndClearAtIsNotNullOrderByClearAtDesc(memberId)
                .orElse(Collections.emptyList());

        if (clearTitleList.isEmpty())
            return Collections.emptyList();

        List<ClearMandalartDto> clearMandalartDtoList = new ArrayList<>();

        for (int i = 0; i < clearTitleList.size(); i++) {
            Title title = clearTitleList.get(i);
            List<BigGoal> bigGoalList = Optional.ofNullable(title)
                    .map(Title::getBigGoals)
                    .orElse(Collections.emptyList());

            List<SearchBigDto> searchBigDtoList = new ArrayList<>();

            for (int j = 0; j < bigGoalList.size(); j++) {
                SearchBigDto searchBigDto = new SearchBigDto(bigGoalList.get(j).getContent(), bigGoalList.get(j).getLocation());
                searchBigDtoList.add(searchBigDto);
            }

            SearchDto searchDto = SearchDto.builder()
                    .title(title.getContent())
                    .bigList(searchBigDtoList)
                    .isLike(mandalartLikeService.isMandalartLike(memberId, title.getId()))
                    .likeCnt(mandalartLikeService.mandalartLikeCnt(title.getId()))
                    .build();

            ClearMandalartDto clearMandalartDto = new ClearMandalartDto(searchDto, title.getId());
            clearMandalartDtoList.add(clearMandalartDto);
        }

        return clearMandalartDtoList;
    }

    @Override
    public void delete(String memberId) {
        Title title = getTitle(memberId);
        title.setDeletedAt(LocalDateTime.now());
        titleRepository.save(title);
    }
}
