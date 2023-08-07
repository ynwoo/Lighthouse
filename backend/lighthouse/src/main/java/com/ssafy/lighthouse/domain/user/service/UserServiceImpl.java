package com.ssafy.lighthouse.domain.user.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.ssafy.lighthouse.domain.user.dto.AlertDto;
import com.ssafy.lighthouse.domain.user.dto.ProfileResponse;
import com.ssafy.lighthouse.domain.user.dto.UserEvalDto;
import com.ssafy.lighthouse.domain.user.dto.UserMyPageDto;
import com.ssafy.lighthouse.domain.user.entity.AlertQueue;
import com.ssafy.lighthouse.domain.user.entity.Follow;
import com.ssafy.lighthouse.domain.user.entity.User;
import com.ssafy.lighthouse.domain.user.entity.UserEval;
import com.ssafy.lighthouse.domain.user.entity.UserTag;
import com.ssafy.lighthouse.domain.user.exception.UserNotFoundException;
import com.ssafy.lighthouse.domain.user.repository.AlertQueueRepository;
import com.ssafy.lighthouse.domain.user.repository.FollowRepository;
import com.ssafy.lighthouse.domain.user.repository.UserEvalRepository;
import com.ssafy.lighthouse.domain.user.repository.UserRepository;
import com.ssafy.lighthouse.domain.user.repository.UserTagRepository;
import com.ssafy.lighthouse.global.util.ERROR;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final UserTagRepository userTagRepository;
	private final UserEvalRepository userEvalRepository;
	private final FollowRepository followRepository;
	private final AlertQueueRepository alertQueueRepository;

	@Override
	public void addUser(UserMyPageDto userMyPageDto) {
		User user = User.from(userMyPageDto);
		user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
		User savedUser = userRepository.save(user);
		List<Long> list = userMyPageDto.getUserTagList();
		for (Long tagId : list) {
			UserTag userTag = UserTag.from(savedUser.getId(), tagId);
			userTagRepository.save(userTag);
		}
	}

	@Override
	public UserMyPageDto loginUser(String userEmail, String userPwd) {
		User loginUser = userRepository.findByEmailAndIsValid(userEmail, 1);
		if (loginUser != null && BCrypt.checkpw(userPwd,
			userRepository.getReferenceById(loginUser.getId()).getPassword())) {
			return UserMyPageDto.from(loginUser);
		}
		return null;
	}

	@Override
	public UserMyPageDto getUserByEmail(String userEmail) {
		return UserMyPageDto.from(userRepository.findByEmailAndIsValid(userEmail, 1));
	}

	@Override
	public UserMyPageDto getUserById(Long userId) {
		User user = userRepository.findByIdAndIsValid(userId, 1);
		List<UserTag> userTags = userTagRepository.findByUserIdAndIsValid(1L, 1);
		UserMyPageDto from = UserMyPageDto.from(user);

		for (UserTag userTag : userTags) {
			from.getUserTagList().add(userTag.getTagId());
		}

		return from;
	}

	@Transactional
	@Override
	public void updateUser(UserMyPageDto userMyPageDto) {
		User foundUser = userRepository.findById(userMyPageDto.getId()).get();

		foundUser.updateUserInfo(
			userMyPageDto.getPassword() == null ? foundUser.getPassword() :
				BCrypt.hashpw(userMyPageDto.getPassword(), BCrypt.gensalt()),
			userMyPageDto.getName(),
			userMyPageDto.getNickname(), userMyPageDto.getProfileImgUrl(),
			userMyPageDto.getAge(), userMyPageDto.getSidoId(), userMyPageDto.getGugunId(),
			userMyPageDto.getPhoneNumber(), userMyPageDto.getDescription());

		userTagRepository.updateIsValidToZeroByUserId(foundUser.getId());

		List<Long> list = userMyPageDto.getUserTagList();
		for (Long tagId : list) {
			UserTag userTag = UserTag.from(foundUser.getId(), tagId);
			userTagRepository.save(userTag);
		}
	}

	@Override
	public void deleteUser(Long userId) {
		userRepository.updateIsValidToZero(userId);
	}

	@Override
	public void saveRefreshToken(Long userId, String refreshToken) throws Exception {
		User user = userRepository.findById(userId).orElseThrow(
			() -> new IllegalArgumentException("User not found with ID: " + userId));
		System.out.println(user.getId());
		user.setToken(refreshToken);
		userRepository.save(user);
	}

	@Override
	public Object getRefreshToken(Long userId) throws Exception {
		return userRepository.findById(userId).get().getToken();
		//return userMapper.getRefreshToken(userid);
	}

	@Override
	public void deleRefreshToken(Long userId) throws Exception {
		userRepository.deleteRefreshToken(userId);
	}

	@Override
	public UserMyPageDto getMyPageUser(Long userId) {
		User user = userRepository.findById(userId).orElseThrow(
			() -> new UserNotFoundException(userId.toString())
		);
		return this.entityToDto(user);
	}

	@Override
	public ProfileResponse findProfileByUserId(Long userId, Long loginId) {
		return userRepository.findProfileByUserId(userId, loginId);
	}

	@Override
	public void createUserEval(UserEvalDto userEvalDto) {
		Optional<UserEval> result = userEvalRepository.find(userEvalDto.getUserId(), userEvalDto.getEvaluatorId());
		if (result.isPresent()) {
			throw new UserNotFoundException(ERROR.CREATE);
		}
		userEvalRepository.save(userEvalDto.toEntity());
	}

	@Override
	public void removeUserEval(Long userId, Long evaluatorId) {
		Optional<UserEval> result = userEvalRepository.find(userId, evaluatorId);
		result.orElseThrow(() -> new UserNotFoundException(ERROR.REMOVE)).remove();
	}

	@Override
	public void createFollow(Long followeeId, Long followerId) {
		Optional<Follow> result = followRepository.find(followeeId, followerId);
		if (result.isPresent()) {
			throw new UserNotFoundException(ERROR.CREATE);
		}
		followRepository.save(Follow.builder()
			.followerId(followerId)
			.followeeId(followeeId)
			.build());
	}

	@Override
	public void removeFollow(Long followeeId, Long followerId) {
		Optional<Follow> result = followRepository.find(followeeId, followerId);
		log.debug("followeeId : {}", result.get().getFolloweeId());
		log.debug("followerId : {}", result.get().getFollowerId());
		result.orElseThrow(() -> new UserNotFoundException(ERROR.REMOVE)).remove();
	}

	@Override
	public boolean isEmailUnique(String emailToValidate) {
		User existingUser = userRepository.findByEmailAndIsValid(emailToValidate, 1);
		return existingUser == null;
	}

	@Override
	public boolean isNicknameUnique(String nicknameToValidate) {
		User existingUser = userRepository.findByNicknameAndIsValid(nicknameToValidate, 1);
		return existingUser == null;
	}

	@Override
	public List<AlertDto> getAlertDtoList(Long id) {
		List<AlertDto> result = new ArrayList<>();
		// 구현 예정
		List<AlertQueue> alertQueues = alertQueueRepository.findByConsumerIdAndIsValidOrderByCreatedAtDesc(
			id, 1);
		for(AlertQueue alertQueue : alertQueues) {
			result.add(alertQueueEntityToAlertDto(alertQueue));
		}
		return result;
	}
}
