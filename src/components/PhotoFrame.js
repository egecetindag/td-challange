import '../assets/styles/photo-frame.less'
import { StarOutlined, StarFilled, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { addFav, deleteFav, voteCat } from '../actions/catsActions';
import { useDispatch } from 'react-redux';

function PhotoFrame({ url, imgId, catVote,catFav }) {
    const dispatch = useDispatch();

    const changeFav=()=>{
        if(catFav){
            dispatch(deleteFav(catFav))
        }
        if(!catFav){
            dispatch(addFav(imgId))
        }
       
    }
    const upVote=()=>{
        dispatch(voteCat({image_id:imgId, value:1}));
    }
    const downVote=()=>{
        dispatch(voteCat({image_id:imgId, value:0}));
    }
    return (
        <div className="photo-frame">
            <div className="photo-frame-inside">
                <img alt="cat" src={url} />
            </div>
            <div className="photo-bottom mt-1">
                <Button onClick={changeFav} type="primary" size="large" shape="circle" icon={catFav ? <StarFilled /> : <StarOutlined />} />
                <div className="line">
                    <div className="line-ins mr-1">
                        <Button onClick={downVote}  type="primary" size="large" shape="circle" icon={<DislikeOutlined />} />
                        <div className="ml-07"></div></div>
    <div className="line-ins"><Button onClick={upVote}  size="large" type="primary" shape="circle" icon={<LikeOutlined />} /><div className="ml-07">{catVote}</div></div>
                </div>
            </div>

        </div>
    );
}

export default PhotoFrame;
