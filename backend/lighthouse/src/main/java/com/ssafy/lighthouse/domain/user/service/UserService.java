package com.ssafy.lighthouse.domain.user.service;

import java.util.List;

import com.ssafy.lighthouse.domain.user.dto.AlertDto;
import com.ssafy.lighthouse.domain.user.dto.ProfileResponse;
import com.ssafy.lighthouse.domain.user.dto.UserEvalDto;
import com.ssafy.lighthouse.domain.user.dto.UserMyPageDto;
import com.ssafy.lighthouse.domain.user.entity.AlertQueue;
import com.ssafy.lighthouse.domain.user.entity.User;
import org.springframework.web.multipart.MultipartFile;

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

	ProfileResponse findProfileByUserId(Long userId, Long loginId);

	UserMyPageDto getMyPageUser(Long userId);

	// userEval
	void createUserEval(UserEvalDto userEvalDto);

	void removeUserEval(Long userId, Long evaluatorId);

	// follow
	void createFollow(Long followeeId, Long followerId);

	void removeFollow(Long followeeId, Long followerId);

	void updateProfileImage(MultipartFile img, Long userId);

	boolean isEmailUnique(String emailToValidate);

	boolean isNicknameUnique(String nicknameToValidate);


	List<AlertDto> getAlertDtoList(Long id);

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

	default AlertDto alertQueueEntityToAlertDto(AlertQueue alertQueue) {
		AlertDto alertDto = AlertDto.builder()
			.id(alertQueue.getId())
			.createdAt(alertQueue.getCreatedAt())
			.producerId(alertQueue.getProducerId())
			.consumerId(alertQueue.getConsumerId())
			.message(alertQueue.getMessage())
			.type(alertQueue.getType())
			.build();
		return alertDto;
	}
}
