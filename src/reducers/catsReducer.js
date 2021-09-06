import {
	GET_CATS_ERROR,
	GET_CATS_REQUEST,
	GET_CATS_SUCCESS,
	UPLOAD_CAT_ERROR,
	UPLOAD_CAT_SUCCESS,
	UPLOAD_CAT_REQUEST,
	GET_VOTES_SUCCESS,
	GET_FAVOURITES_SUCCESS
} from '../actions/types';

const INIT_STATE = {
	cats: [],
	loadingUpload: false,
	loadingCats: false,
	catVotes: {},
	catFavs:{}
};
const getVotesForCats = (catVotes) => {
	let obj = {};
	catVotes.map((vote) =>{
		if(!obj[vote.image_id]){
			obj[vote.image_id] = 0;
		}
		if(vote.value === 1){
			obj[vote.image_id]++;
		}
		if(vote.value === 0){
			obj[vote.image_id]--;
		}
	})
	return obj;
}
const getFavsForCats = (catFavs) => {
	let obj = {};

	catFavs.map((fav) =>{
			obj[fav.image_id] = fav.id;
	})
	return obj;
}
export default (state = INIT_STATE, action) => {
	switch (action.type) {
		case GET_CATS_REQUEST:
			return { ...state, loadingCats: true }
		case GET_CATS_SUCCESS:
			return { ...state, loadingCats: false, cats: action.cats }
		case GET_CATS_ERROR:
			return { ...state, loadingCats: false }
		case UPLOAD_CAT_REQUEST:
			return { ...state, loadingUpload: true }
		case UPLOAD_CAT_SUCCESS:
			return { ...state, loadingUpload: false, cats: action.cats }
		case UPLOAD_CAT_ERROR:
			return { ...state, loadingUpload: false }
		case GET_VOTES_SUCCESS:
			 const catVotes = getVotesForCats(action.catVotes);
			 return { ...state, catVotes }
		case GET_FAVOURITES_SUCCESS:
			const catFavs = getFavsForCats(action.catFavs);
			 return { ...state, catFavs }
		default:
			return { ...state };
	}
}
