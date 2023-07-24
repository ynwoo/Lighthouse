package com.ssafy.lighthouse.domain.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.lighthouse.domain.user.dto.UserMyPageDto;
import com.ssafy.lighthouse.domain.user.entity.User;
import com.ssafy.lighthouse.domain.user.exception.UserNotFoundException;
import com.ssafy.lighthouse.domain.user.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	private UserRepository userRepository;

	@Autowired
	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public UserMyPageDto getMyPageUser(Integer userId) {
		User user = userRepository.findById(userId).orElseThrow(
			() -> new UserNotFoundException(userId.toString())
		);
		return this.entityToDto(user);
	}
}
