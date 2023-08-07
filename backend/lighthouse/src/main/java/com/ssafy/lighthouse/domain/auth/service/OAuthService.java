package com.ssafy.lighthouse.domain.auth.service;

import java.util.HashMap;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.ssafy.lighthouse.domain.auth.dto.OAuthTokenDto;
import com.ssafy.lighthouse.domain.auth.dto.OAuthUserInfoDto;
import com.ssafy.lighthouse.domain.user.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class OAuthService {

	private final String GOOGLE_TOKEN_REQUEST_URL = "https://oauth2.googleapis.com/token";

	@Value("${GOOGLE_CLIENT_ID}")
	private String GOOGLE_CLIENT_ID;
	@Value("${GOOGLE_CLIENT_SECRET}")
	private String GOOGLE_CLIENT_SECRET;
	@Value("${REDIRECT_URI}")
	private String REDIRECT_URI;

	private RestTemplate restTemplate;
	private final UserRepository userRepository;

	@Autowired
	public OAuthService(UserRepository userRepository, RestTemplate restTemplate) {
		this.userRepository = userRepository;
		this.restTemplate = restTemplate;
	}

	public OAuthTokenDto getGoogleAccessToken(String accessCode) {
		Map<String, String> params = generateParams(accessCode);
		JSONParser parser;
		JSONObject elem;

		ResponseEntity<String> responseEntity = restTemplate.postForEntity(GOOGLE_TOKEN_REQUEST_URL, params,
			String.class);

		if (responseEntity.getStatusCode() == HttpStatus.OK) {
			String responseBody = responseEntity.getBody();
			// System.out.println(responseBody);
			parser = new JSONParser();
			try {
				elem = (JSONObject)parser.parse(responseBody);
			} catch (ParseException e) {
				log.debug("JSON 파싱 실패 : {}", e.getMessage());
				throw new RuntimeException(e);
			}
			return OAuthTokenDto.builder()
				.tokenType(elem.get("token_type").toString())
				.accessToken(elem.get("access_token").toString())
				.expiresIn(elem.get("expires_in").toString())
				.scope(elem.get("scope").toString())
				.idToken(elem.get("id_token").toString())
				.build();
		}
		return null;
	}

	public OAuthUserInfoDto getUserInfo(OAuthTokenDto oAuthTokenDto) {
		String idToken = oAuthTokenDto.getIdToken();
		String requestUrl = UriComponentsBuilder.fromHttpUrl(GOOGLE_TOKEN_REQUEST_URL + "info")
			.queryParam("id_token", idToken).toUriString();

		String userInfoFromProvider = restTemplate.getForObject(requestUrl, String.class);
		// System.out.println(userInfoFromProvider);
		JSONParser parser = new JSONParser();
		try {
			JSONObject userInfo = (JSONObject)parser.parse(userInfoFromProvider);
			return OAuthUserInfoDto.builder()
				.email(userInfo.get("email").toString())
				.name(userInfo.get("name").toString())
				.profileImg(userInfo.get("picture").toString())
				.providerId(userInfo.get("sub").toString())
				.build();
		} catch (ParseException e) {
			log.debug("파싱 실패: {}", e.getMessage());
			throw new RuntimeException(e);
		}
	}

	private Map<String, String> generateParams(String accessCode) {
		Map<String, String> params = new HashMap<>();
		params.put("code", accessCode);
		params.put("client_id", GOOGLE_CLIENT_ID);
		params.put("client_secret", GOOGLE_CLIENT_SECRET);
		params.put("redirect_uri", REDIRECT_URI);
		params.put("grant_type", "authorization_code");
		return params;
	}
}
