package com.ssafy.lighthouse.domain.user.service;

import com.ssafy.lighthouse.domain.user.dto.UserMyPageDto;
import com.ssafy.lighthouse.domain.user.entity.User;

public interface UserService {

    void addUser(UserMyPageDto userMyPageDto);

    UserMyPageDto loginUser(String userEmail, String userPwd);

    UserMyPageDto getUserByEmail(String userEmail);

    UserMyPageDto getUserById(Long userId);

    void updateUser(UserMyPageDto userMyPageDto);

    void deleteUser(Long userId);
    // List<String> getKeywordsByUserId(Long userId);
    void saveRefreshToken(Long userId, String refreshToken) throws Exception;

    Object getRefreshToken(Long userId) throws Exception;

    void deleRefreshToken(Long userId) throws Exception;

    UserMyPageDto getMyPageUser(Long userId);

    // List<String> getKeywordsByUserId(Long userId);

    default UserMyPageDto entityToDto(User userEntity) {
        UserMyPageDto dto = UserMyPageDto.builder()
                .name(userEntity.getName())
                .email(userEntity.getEmail())
                .nickname(userEntity.getNickname())
                .profileImgUrl(userEntity.getProfileImgUrl())
                .age(userEntity.getAge())
                .sidoId(userEntity.getSidoId())
                .gugunId(userEntity.getGugunId())
                .phoneNumber(userEntity.getPhoneNumber())
                .description(userEntity.getDescription())
                .build();
        return dto;
    }
}
