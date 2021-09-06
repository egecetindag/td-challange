import { Upload, Button, message, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import '../../assets/styles/upload-page.less';
import Header from '../../components/Header';
import { useState } from 'react';
import { uploadCat } from '../../actions/catsActions';
import { useHistory } from 'react-router-dom';

function UploadPage() {
    const [file, setFile] = useState();
    const history = useHistory();
    const dispatch = useDispatch();
    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', file);
        // formData.append('sub_id', 1);

        dispatch(uploadCat(formData, history, message))
    }
    const { loadingUpload } = useSelector(state => ({
        loadingUpload: state.catsReducer.loadingUpload,
    }));
    const props = {
        multiple: false,
        onRemove: file => {
            setFile(undefined)
        },
        beforeUpload: file => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('You can only upload JPG/PNG file!');
            }
            else {
                setFile(file);
            }
            return false;
        },
        fileList: file ? [file] : []
    }

    return (
        <>
            <Header />
            <div className="upload-page">
                {loadingUpload && <div className="full-page"><Spin size="large" /></div>}
                <div className="upload-title">Upload a Cat Picture</div>
                <div className="upload-page-inside">
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>

                    <Button
                        type="primary"
                        onClick={handleUpload}
                        disabled={!file}
                        // loading={uploading}
                        style={{ marginTop: 16 }}
                    >
                        Upload
                        {/* {uploading ? 'Uploading' : 'Start Upload'} */}
                    </Button>

                </div>

            </div>
        </>
    );
}

export default UploadPage;

