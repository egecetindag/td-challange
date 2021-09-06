import { message } from 'antd';
import axios from 'axios';

import {
	GET_CATS_REQUEST,
	GET_CATS_SUCCESS,
	GET_CATS_ERROR,
	UPLOAD_CAT_REQUEST,
	UPLOAD_CAT_SUCCESS,
	UPLOAD_CAT_ERROR,
	VOTE_CAT_ERROR,
	VOTE_CAT_REQUEST,
	VOTE_CAT_SUCCESS,
	GET_VOTES_SUCCESS,
	GET_FAVOURITES_SUCCESS,
	FAV_CAT_REQUEST,
	FAV_CAT_SUCCESS,
	FAV_CAT_ERROR,
	DELETE_FAV_CAT_SUCCESS,
	DELETE_FAV_CAT_REQUEST,
	DELETE_FAV_CAT_ERROR
} from './types.js'


export function getCats() {
	return async (dispatch) => {
		dispatch({
			type: GET_CATS_REQUEST,
		})

		axios.get("https://api.thecatapi.com/v1/images?limit=100", {
			headers: {
				"x-api-key": 'ccb4c5ea-6e31-49a5-9a33-301d0f747ed3'
			}
		})
			.then((response) => {
				dispatch({
					type: GET_CATS_SUCCESS,
					cats: response?.data
				})
			})
			.catch((error) => {
				dispatch({
					type: GET_CATS_ERROR,
				})
			});

	}
}

export function voteCat(vote) {
	return async (dispatch) => {
		dispatch({
			type: VOTE_CAT_REQUEST,
		})

		axios.post("https://api.thecatapi.com/v1/votes", vote, {
			headers: {
				"x-api-key": 'ccb4c5ea-6e31-49a5-9a33-301d0f747ed3'
			}
		})
			.then((response) => {
				message.success("Successfully voted!")
				dispatch({
					type: VOTE_CAT_SUCCESS,
				})
				dispatch(getVotes());
			})
			.catch((error) => {
				message.error("Something went wrong!")
				dispatch({
					type: VOTE_CAT_ERROR,
				})
			});
	}
}

export function addFav(id) {
	return async (dispatch) => {
		dispatch({
			type: FAV_CAT_REQUEST,
		})

		axios.post("https://api.thecatapi.com/v1/favourites", { image_id: id }, {
			headers: {
				"x-api-key": 'ccb4c5ea-6e31-49a5-9a33-301d0f747ed3'
			}
		})
			.then((response) => {
				message.success("Successfully added to favourites!")
				dispatch({
					type: FAV_CAT_SUCCESS,
				})
				dispatch(getFavs());
			})
			.catch((error) => {
				message.error("Something went wrong!")
				dispatch({
					type: FAV_CAT_ERROR,
				})
			});
	}
}

export function deleteFav(id) {
	return async (dispatch) => {
		dispatch({
			type: DELETE_FAV_CAT_REQUEST,
		})

		axios.delete(`https://api.thecatapi.com/v1/favourites/${id}`, {
			headers: {
				"x-api-key": 'ccb4c5ea-6e31-49a5-9a33-301d0f747ed3'
			}
		})
			.then((response) => {
				message.success("Successfully deleted from favourites!")
				dispatch({
					type: DELETE_FAV_CAT_SUCCESS,
				})
				dispatch(getFavs());
			})
			.catch((error) => {
				message.error("Something went wrong!")
				dispatch({
					type: DELETE_FAV_CAT_ERROR,
				})
			});
	}
}

export function getVotes() {
	return async (dispatch) => {

		axios.get("https://api.thecatapi.com/v1/votes", {
			headers: {
				"x-api-key": 'ccb4c5ea-6e31-49a5-9a33-301d0f747ed3'
			}
		})
			.then((response) => {
				dispatch({
					type: GET_VOTES_SUCCESS,
					catVotes: response.data
				})
			})
			.catch((error) => {
				console.log("error")
			});
	}
}

export function getFavs() {
	return async (dispatch) => {

		axios.get("https://api.thecatapi.com/v1/favourites", {
			headers: {
				"x-api-key": 'ccb4c5ea-6e31-49a5-9a33-301d0f747ed3'
			}
		})
			.then((response) => {
				dispatch({
					type: GET_FAVOURITES_SUCCESS,
					catFavs: response.data
				})
			})
			.catch((error) => {
				console.log("error")
			});
	}
}

export function uploadCat(file, history, message) {
	return async (dispatch) => {
		dispatch({
			type: UPLOAD_CAT_REQUEST,
		})

		axios.post("https://api.thecatapi.com/v1/images/upload", file, {
			headers: {
				"Content-Type": "multipart/form-data",
				"x-api-key": 'ccb4c5ea-6e31-49a5-9a33-301d0f747ed3'
			}
		})
			.then((response) => {
				message.success("Successfully added!")
				dispatch({
					type: UPLOAD_CAT_SUCCESS,
				})
				history.push("/")
			})
			.catch((error) => {

				message.error("Something went wrong!")
				dispatch({
					type: UPLOAD_CAT_ERROR,
				})
			});

	}
}