package com.project.smg.auth.oauth2;

import com.project.smg.auth.oauth2.userinfo.KakaoOAuth2UserInfo;
import com.project.smg.auth.oauth2.userinfo.OAuth2UserInfo;
import com.project.smg.member.entity.Member;
import com.project.smg.member.entity.Role;
import com.project.smg.member.entity.SocialType;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

/**
 * 각 소셜에서 받아오는 데이터가 다르므로
 * 소셜별로 데이터를 받는 데이터를 분기 처리하는 DTO 클래스
 * 소셜 로그인 추가 등록 시 추가 작성
 */
@Getter
public class OAuthAttributes {

    private String nameAttributeKey; // OAuth2 로그인 진행 시 키가 되는 필드 값, PK와 같은 의미
    private OAuth2UserInfo oauth2UserInfo; // 소셜 타입별 로그인 유저 정보(닉네임, 이메일, 프로필 사진 등등)

    @Builder
    public OAuthAttributes(String nameAttributeKey, OAuth2UserInfo oauth2UserInfo) {
        this.nameAttributeKey = nameAttributeKey;
        this.oauth2UserInfo = oauth2UserInfo;
    }

    public static OAuthAttributes of(SocialType socialType,
                              String userNameAttributeName, Map<String, Object> attributes) {
        if (socialType == SocialType.KAKAO) {
            return ofKakao(userNameAttributeName, attributes);
        }
        return ofKakao(userNameAttributeName, attributes);
    }

    public static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .nameAttributeKey(userNameAttributeName)
                .oauth2UserInfo(new KakaoOAuth2UserInfo(attributes))
                .build();
    }

    /**
     * of메소드로 OAuthAttributes 객체가 생성되어, 유저 정보들이 담긴 OAuth2UserInfo가 소셜 타입별로 주입된 상태
     * OAuth2UserInfo에서 socialId(식별값), nickname, imageUrl을 가져와서 build
     * email에는 UUID로 중복 없는 랜덤 값 생성
     * role은 GUEST로 설정
     */
    public Member toEntity(OAuth2UserInfo oauth2UserInfo, SocialType socialType) {
        return Member.builder()
                .socialType(socialType)
                .role(Role.GUEST)
                .id((oauth2UserInfo.getId()))
                .nickname(oauth2UserInfo.getNickname())
                .imageUrl(oauth2UserInfo.getImageUrl())
                .build();
    }
}
