package com.project.smg.auth.oauth2.service;

import com.project.smg.auth.oauth2.CustomOAuth2User;
import com.project.smg.auth.oauth2.OAuthAttributes;
import com.project.smg.member.entity.Member;
import com.project.smg.member.entity.SocialType;
import com.project.smg.member.repository.MemberRepository;
import com.project.smg.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private static final String KAKAO = "kakao";

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        log.info("CustomOAuth2UserService.loadUser() 실행 - OAuth2 로그인 요청 진입");

        /**
         * DefaultOAuth2UserService 객체를 생성하여, loadUser(userRequest)를 통해 DefaultOAuth2User 객체를 생성 후 반환
         * DefaultOAuth2UserService의 loadUser()는 소셜 로그인 API의 사용자 정보 제공 URI로 요청을 보내서
         * 사용자 정보를 얻은 후, 이를 통해 DefaultOAuth2User 객체를 생성 후 반환한다.
         * 결과적으로, OAuth2User는 OAuth 서비스에서 가져온 유저 정보를 담고 있는 유저
         */
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        SocialType socialType = getSocialType(registrationId);

        String userNameAttributeName = userRequest
                .getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName(); // OAuth2 로그인 시 키(PK)가 되는 값

        Map<String, Object> attributes = oAuth2User.getAttributes(); // 소셜 로그인에서 API가 제공하는 userInfo의 Json 값(유저 정보들)

        // socialType에 따라 유저 정보를 통해 OAuthAttributes 객체 생성
        OAuthAttributes extractAttributes = OAuthAttributes.of(socialType, userNameAttributeName, attributes);

        Member createdUser = getUser(extractAttributes, socialType); // getUser() 메소드로 User 객체 생성 후 반환

        log.info("유저정보 : {}", createdUser.getRole().getKey());

        return new CustomOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(createdUser.getRole().getKey())),
                attributes,
                extractAttributes.getNameAttributeKey(),
                createdUser.getRole()
        );
    }

    /**
     * 카카오 로그인 외 추가적인 소셜 로그인 기능을 확장 할 수도 있어 메소드 생성
     */
    private SocialType getSocialType(String registrationId) {
        if (KAKAO.equals(registrationId)) {
            return SocialType.KAKAO;
        }
        return SocialType.KAKAO;
    }

    /**
     * attributes에 들어있는 소셜 로그인의 식별값 id를 통해 회원을 찾아 반환하는 메소드
     * 만약 찾은 회원이 있다면, 그대로 반환하고 없다면 saveUser()를 호출하여 회원을 저장한다.
     */
    private Member getUser(OAuthAttributes attributes, SocialType socialType) {
        Member findUser = memberRepository.findById((attributes.getOauth2UserInfo().getId()))
                .orElse(null);

        if (findUser == null) {
            return saveUser(attributes, socialType);
        } else {
            //유저 프로필 이미지 변경 시 업데이트
            if (!findUser.getImageUrl().equals(attributes.getOauth2UserInfo().getImageUrl())) {
                findUser.updateImageUrl(attributes.getOauth2UserInfo().getImageUrl());
                memberRepository.save(findUser);
            }
        }
        return findUser;
    }

    /**
     * OAuthAttributes의 toEntity() 메소드를 통해 빌더로 User 객체 생성 후 반환
     * 생성된 User 객체를 DB에 저장
     */
    private Member saveUser(OAuthAttributes attributes, SocialType socialType) {
        Member createdUser = attributes.toEntity(attributes.getOauth2UserInfo(), socialType);
        log.info("신규 유저 가입 {}", createdUser.getNickname());
        memberRepository.save(createdUser);
        memberService.addMemberPodo(createdUser.getId());
        return createdUser;
    }
}
