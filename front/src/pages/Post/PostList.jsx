import React, { useEffect, useState, useRef } from "react";
import axios from "../../api/axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { routes } from '../../util/Route'; 
import { useGroup } from '../../util/GroupContext';
import { useNavigate, useParams } from "react-router-dom";
import { MyCustomUploadAdapterPlugin, extractTempImages
        , uploadedTempImages, deleteTempImages } from '../../util/UploadPostFileUtil';

const PostList = ({}) => {
    const { userInfo, groupInfo, categoryList } = useGroup();    
    const [category, setCategory] = useState(categoryList[0]?.uid)
    const [subCategory, setSubCategory] = useState()
    const navigate = useNavigate();



    return (
        <></>
    )
}

export default PostList;