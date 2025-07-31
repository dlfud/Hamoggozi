import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useGroup } from '../../util/GroupContext';
import { routes } from '../../util/Route'; 
import { useNavigate, useParams } from "react-router-dom";

const Category = () => {
    const { userInfo, groupInfo } = useGroup();    
    const { groupUid } = useParams();
    const navigate = useNavigate();

    const [categoryList, setCategoryList] = useState([])
    const [editingId, setEditingId] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [categoryForm, setCategoryForm] = useState({ name: '', upCategory: '', order: 1 });

    useEffect(() => {
        if (!userInfo) return;

        getCategoryList()
    }, [userInfo]);

    const getCategoryList = async () => {
        /* try {
            const res = await axios.post("/setting/category/getCategoryList", {groupUid: groupUid}); // 현재 로그인한 사용자가 그룹에 속했는지, MANAGER 권한인지 확인
            if(res.data.status === 'success') {
                setCategoryList(res.data.categoryList)
            }else{
                alert(res.data.message);
            }
        } catch (err) {
            console.error("데이터 가져오기 실패", err);
        }*/
       setCategoryList([
            { uid: 1, name: '개발', upCategory: null, order: 1 },
            { uid: 2, name: 'React', upCategory: 1, order: 1 },
            { uid: 3, name: 'Vue', upCategory: 1, order: 2 },
            { uid: 4, name: '일상', upCategory: null, order: 2 },
       ])
    }

    const sortCategoryList = () => {
        const sorted = [...categoryList].sort((a, b) =>
            a.upCategory === b.upCategory
                ? a.order - b.order
                : a.upCategory === null
                ? -1
                : 1
            );

        return sorted.map(setCategory);
    };

    const setCategory = (cat) => {
        const isEditing = editingId === cat.uid;

        return (
            <div key={cat.uid} className={`category-row ${cat.upCategory ? 'child' : 'parent'}`}>
                {isEditing ? (
                    <>
                        <input
                        value={categoryForm.name}
                        onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                        />
                        <select
                        value={categoryForm.upCategory}
                        onChange={(e) => setCategoryForm({ ...categoryForm, upCategory: e.target.value })}
                        >
                        <option value="">(상위 없음)</option>
                        {categoryList.filter((c) => c.upCategory === null && c.uid !== cat.uid).map((p) => (
                            <option key={p.uid} value={p.uid}>
                                {p.name}
                            </option>
                        ))}
                        </select>
                        <input
                        type="number"
                        value={categoryForm.order}
                        onChange={(e) => setCategoryForm({ ...categoryForm, order: e.target.value })}
                        style={{ width: 60 }}
                        />
                        <button onClick={updateCategory}>저장</button>
                        <button onClick={() => setEditingId(null)}>취소</button>
                    </>
                ) : (
                    <>
                        <span>{cat.name}</span>
                        <span>{cat.upCategory ? `(하위)` : `(상위)`}</span>
                        <span>순서: {cat.order}</span>
                        <button onClick={() => setUpdateCategoryForm(cat)}>수정</button>
                        <button onClick={() => deleteCategory(cat.uid)}>삭제</button>
                    </>
                )}
            </div>
        );
    };

    //카테고리 추가
    const setInsertFrom = () => (
        <div className="category-row add-form">
            <input
                placeholder="카테고리명"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
            />
            <select
                value={categoryForm.upCategory}
                onChange={(e) => setCategoryForm({ ...categoryForm, upCategory: e.target.value })}
            >
                <option value="">(상위 없음)</option>
                {categoryList.filter((c) => c.upCategory === null).map((p) => (
                    <option key={p.uid} value={p.uid}>
                        {p.name}
                    </option>
                ))}
            </select>
            <input
                type="number"
                value={categoryForm.order}
                onChange={(e) => setCategoryForm({ ...categoryForm, order: e.target.value })}
                style={{ width: 60 }}
            />
            <button onClick={insertCategory}>추가</button>
            <button onClick={() => setIsAdding(false)}>취소</button>
        </div>
    );

    const insertCategory = async () => {
        if (!categoryForm.name.trim()) return alert('카테고리명을 입력하세요');

        const param = {
            groupUid: groupUid,
            name: categoryForm.name,
            upCategory: categoryForm.upCategory === '' ? null : Number(categoryForm.upCategory),
            order: Number(categoryForm.order),
        };

        try {
            const res = await axios.post("/setting/category/insertCategory", param); // 현재 로그인한 사용자가 그룹에 속했는지, MANAGER 권한인지 확인
            if(res.data.status === 'success') {
                getCategoryList()
                setCategoryForm({ name: '', upCategory: '', order: 1 });
                setIsAdding(false);
            }else{
                alert(res.data.message);
            }
        } catch (err) {
            console.error("데이터 가져오기 실패", err);
        }
    }

    // update
    const setUpdateCategoryForm = (cat) => {
        setEditingId(cat.uid);
        setCategoryForm({
            name: cat.name,
            upCategory: cat.upCategory,
            order: cat.order
        })
    } 

    const updateCategory = async (cat) => {
        if (!categoryForm.name.trim()) return alert('카테고리명을 입력하세요');

        const param = {
            groupUid: groupUid,
            name: categoryForm.name,
            upCategory: categoryForm.upCategory === '' ? null : Number(categoryForm.upCategory),
            order: Number(categoryForm.order),
        };

        try {
            const res = await axios.post("/setting/category/updateCategory", param); // 현재 로그인한 사용자가 그룹에 속했는지, MANAGER 권한인지 확인
            if(res.data.status === 'success') {
                getCategoryList()
                setEditingId(null)
            }else{
                alert(res.data.message);
            }
        } catch (err) {
            console.error("데이터 가져오기 실패", err);
        }
    }

    //delete
    const deleteCategory = async (uid) => {
        let param = {
            groupUid: groupUid,
            uid: uid
        }

        try {
            const res = await axios.post("/setting/category/deleteCategory", param); // 현재 로그인한 사용자가 그룹에 속했는지, MANAGER 권한인지 확인
            if(res.data.status === 'success') {
                getCategoryList()
            }else{
                alert(res.data.message);
            }
        } catch (err) {
            console.error("데이터 가져오기 실패", err);
        }
    }

    return (
        <div className="category-manager">
        <h2>카테고리 관리</h2>
        <button className="add-toggle-btn" onClick={() => setIsAdding(true)}>
            + 카테고리 추가
        </button>

        {isAdding && setInsertFrom()}
        {sortCategoryList()}
        </div>
    )
}

export default Category;





  /*
    let nextId = 100;
  const [categories, setCategories] = useState([
    { id: 1, name: '개발', parentId: null, order: 1 },
    { id: 2, name: 'React', parentId: 1, order: 1 },
    { id: 3, name: 'Vue', parentId: 1, order: 2 },
    { id: 4, name: '일상', parentId: null, order: 2 },
  ]);
  const [form, setForm] = useState({ name: '', parentId: '', order: 1 });

  const handleEdit = (cat) => {
    setEditingId(cat.id);
    setForm({
      name: cat.name,
      parentId: cat.parentId ?? '',
      order: cat.order,
    });
  };

  const handleSave = () => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === editingId
          ? {
              ...c,
              name: form.name,
              parentId: form.parentId === '' ? null : Number(form.parentId),
              order: Number(form.order),
            }
          : c
      )
    );
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setCategories((prev) => prev.filter((c) => c.id !== id && c.parentId !== id));
    }
  };

  const handleAdd = () => {
    if (!form.name.trim()) return alert('이름을 입력하세요');

    const newCat = {
      id: nextId++,
      name: form.name,
      parentId: form.parentId === '' ? null : Number(form.parentId),
      order: Number(form.order),
    };

    setCategories((prev) => [...prev, newCat]);
    setForm({ name: '', parentId: '', order: 1 });
    setIsAdding(false);
  };

  const renderCategoryRow = (cat) => {
    const isEditing = editingId === cat.id;

    return (
      <div key={cat.id} className={`category-row ${cat.parentId ? 'child' : 'parent'}`}>
        {isEditing ? (
          <>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <select
              value={form.parentId}
              onChange={(e) => setForm({ ...form, parentId: e.target.value })}
            >
              <option value="">(상위 없음)</option>
              {categories
                .filter((c) => c.parentId === null && c.id !== cat.id)
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
            </select>
            <input
              type="number"
              value={form.order}
              onChange={(e) => setForm({ ...form, order: e.target.value })}
              style={{ width: 60 }}
            />
            <button onClick={handleSave}>저장</button>
            <button onClick={() => setEditingId(null)}>취소</button>
          </>
        ) : (
          <>
            <span>{cat.name}</span>
            <span>{cat.parentId ? `(하위)` : `(상위)`}</span>
            <span>순서: {cat.order}</span>
            <button onClick={() => handleEdit(cat)}>수정</button>
            <button onClick={() => handleDelete(cat.id)}>삭제</button>
          </>
        )}
      </div>
    );
  };

  const renderCategoryList = () => {
    const sorted = [...categories].sort((a, b) =>
      a.parentId === b.parentId
        ? a.order - b.order
        : a.parentId === null
        ? -1
        : 1
    );

    return sorted.map(renderCategoryRow);
  };

  const renderAddForm = () => (
    <div className="category-row add-form">
      <input
        placeholder="카테고리명"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <select
        value={form.parentId}
        onChange={(e) => setForm({ ...form, parentId: e.target.value })}
      >
        <option value="">(상위 없음)</option>
        {categories
          .filter((c) => c.parentId === null)
          .map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
      </select>
      <input
        type="number"
        value={form.order}
        onChange={(e) => setForm({ ...form, order: e.target.value })}
        style={{ width: 60 }}
      />
      <button onClick={handleAdd}>추가</button>
      <button onClick={() => setIsAdding(false)}>취소</button>
    </div>
  );

  return (
    <div className="category-manager">
      <h2>카테고리 관리</h2>
      <button className="add-toggle-btn" onClick={() => setIsAdding(true)}>
        + 카테고리 추가
      </button>

      {isAdding && renderAddForm()}
      {renderCategoryList()}
    </div>
  );
}
  */


