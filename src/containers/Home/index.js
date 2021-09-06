import { Spin } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCats, getFavs, getVotes } from '../../actions/catsActions';
import '../../assets/styles/home.less';
import Header from '../../components/Header';
import PhotoFrame from '../../components/PhotoFrame';

function Home() {
    const dispatch = useDispatch();
    const { loadingCats, cats, catVotes,catFavs } = useSelector(state => ({
        loadingCats: state.catsReducer.loadingCats,
        cats: state.catsReducer.cats,
        catVotes: state.catsReducer.catVotes,
        catFavs: state.catsReducer.catFavs
    }));
    useEffect(() => {
        dispatch(getCats());
        dispatch(getVotes());
        dispatch(getFavs());
    }, [])

    return (
        <>
            <Header />
            <div className="Home">
                <div className="photos-container">
                    {loadingCats ? <div className="spin-div"><Spin size="large" /></div> :

                        <>{cats && cats.map(cat => <PhotoFrame catFav={catFavs[cat.id]} catVote={catVotes[cat.id]|| 0} key={cat.id} imgId={cat.id} url={cat.url} />)}</>
            
                    }
                </div>
            </div>
        </>
    );
}

export default Home;
