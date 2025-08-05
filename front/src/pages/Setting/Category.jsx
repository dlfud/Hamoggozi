import React, { useEffect, useState } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragOverlay, rectSortingStrategy} from "@dnd-kit/core";
import { arrayMove, verticalListSortingStrategy,sortableKeyboardCoordinates, useSortable, SortableContext } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import axios from "../../api/axios";
import { useGroup } from '../../util/GroupContext';
import { routes } from '../../util/Route'; 
import { useNavigate, useParams } from "react-router-dom";

const Category = () => {
    const { userInfo, groupInfo } = useGroup();    
    const { groupUid } = useParams();
    const navigate = useNavigate();

    const sensors = useSensors(useSensor(PointerSensor));

    const [categoryList, setCategoryList] = useState([])
    const [editingId, setEditingId] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    const [insertForm, setInsertForm] = useState({ name: '', upCategory: 0})
    const [updateForm, setUpdateForm] = useState({ uid: 0, name: '', upCategory: 0});

    useEffect(() => {
        if (!userInfo) return;

        getCategoryList()
    }, [userInfo]);

    const getCategoryList = async () => {
        try {
            const res = await axios.post("/setting/category/getCategoryList", {groupUid: groupUid});
            if(res.data.status === 'success') {
                setCategoryList(res.data.list)
            }else{
                alert(res.data.message);
            }
        } catch (err) {
            console.error("데이터 가져오기 실패", err);
        }
    }

    const setCategory = () => {
      return (
        <div>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleParentDragEnd(e, 0)}>
            <SortableContext items={categoryList.map((p) => p.uid)} strategy={verticalListSortingStrategy}>
              {categoryList.map(parent => (
                <div key={parent.uid}>
                  {editingId === parent.uid ? (
                    <>
                      <div className="category-row parent">  
                        <div className="w80p">
                          <input className="w100p" value={updateForm.name} onChange={(e) => {setUpdateForm((prev) => ({ ...prev, name: e.target.value }))}}/>
                        </div>
                        <div className="w20p">
                          <button onClick={updateCategory}>저장</button>
                          <button onClick={() => setEditingId(null)}>취소</button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <SortableItem id={parent.uid}>
                        {(listeners) => (
                          <div className="category-row parent">
                            <div className="drag-handle" {...listeners}>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2.66669 4.00004C2.66669 3.82323 2.73693 3.65366 2.86195 3.52864C2.98697 3.40361 3.15654 3.33337 3.33335 3.33337H12.6667C12.8435 3.33337 13.0131 3.40361 13.1381 3.52864C13.2631 3.65366 13.3334 3.82323 13.3334 4.00004C13.3334 4.17685 13.2631 4.34642 13.1381 4.47145C13.0131 4.59647 12.8435 4.66671 12.6667 4.66671H3.33335C3.15654 4.66671 2.98697 4.59647 2.86195 4.47145C2.73693 4.34642 2.66669 4.17685 2.66669 4.00004ZM2.66669 6.66671C2.66669 6.4899 2.73693 6.32033 2.86195 6.1953C2.98697 6.07028 3.15654 6.00004 3.33335 6.00004H12.6667C12.8435 6.00004 13.0131 6.07028 13.1381 6.1953C13.2631 6.32033 13.3334 6.4899 13.3334 6.66671C13.3334 6.84352 13.2631 7.01309 13.1381 7.13811C13.0131 7.26314 12.8435 7.33337 12.6667 7.33337H3.33335C3.15654 7.33337 2.98697 7.26314 2.86195 7.13811C2.73693 7.01309 2.66669 6.84352 2.66669 6.66671ZM2.66669 9.33337C2.66669 9.15656 2.73693 8.98699 2.86195 8.86197C2.98697 8.73695 3.15654 8.66671 3.33335 8.66671H12.6667C12.8435 8.66671 13.0131 8.73695 13.1381 8.86197C13.2631 8.98699 13.3334 9.15656 13.3334 9.33337C13.3334 9.51019 13.2631 9.67975 13.1381 9.80478C13.0131 9.9298 12.8435 10 12.6667 10H3.33335C3.15654 10 2.98697 9.9298 2.86195 9.80478C2.73693 9.67975 2.66669 9.51019 2.66669 9.33337ZM2.66669 12C2.66669 11.8232 2.73693 11.6537 2.86195 11.5286C2.98697 11.4036 3.15654 11.3334 3.33335 11.3334H12.6667C12.8435 11.3334 13.0131 11.4036 13.1381 11.5286C13.2631 11.6537 13.3334 11.8232 13.3334 12C13.3334 12.1769 13.2631 12.3464 13.1381 12.4714C13.0131 12.5965 12.8435 12.6667 12.6667 12.6667H3.33335C3.15654 12.6667 2.98697 12.5965 2.86195 12.4714C2.73693 12.3464 2.66669 12.1769 2.66669 12Z" fill="#1E1E1E"/>
                              </svg>
                            </div>
                            <span className="w80p">{parent.name}</span>
                            <div className="w20p">
                              <button onClick={() => setUpdateCategoryForm(parent)}>수정</button>
                              <button onClick={() => deleteCategory(parent.uid)}>삭제</button>
                            </div>
                          </div>
                        )}
                      </SortableItem>
                    </>
                  )}
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleChildDragEnd(e, parent.uid)}>
                    <SortableContext items={parent.categoryList.map((c) => c.uid)} strategy={verticalListSortingStrategy}>
                      {parent.categoryList.map(child => (
                        <div key={child.uid}>  
                          {editingId === child.uid ? (
                            <>
                              <div className="category-row child">
                                <div className="w60p">
                                  <input className="w100p" value={updateForm.name} onChange={(e) => setUpdateForm((prev) => ({ ...prev, name: e.target.value }))}/>
                                </div>
                                <div className="w20p">
                                  <select className="w100p" value={updateForm.upCategory} onChange={(e) => setUpdateForm((prev) => ({ ...prev, upCategory: e.target.value }))}>
                                    <option value="0">(상위 없음)</option>
                                    {categoryList.filter((c) => c.upCategory === 0).map((p) => (
                                      <option key={p.uid} value={p.uid}>
                                          {p.name}
                                        </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="w20p">
                                  <button onClick={updateCategory}>저장</button>
                                  <button onClick={() => cancelUpdateCategory()}>취소</button>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                            <SortableItem id={child.uid}>
                              {(listeners) => (
                                <div className="category-row child">
                                  <div className="drag-handle" {...listeners}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.66669 4.00004C2.66669 3.82323 2.73693 3.65366 2.86195 3.52864C2.98697 3.40361 3.15654 3.33337 3.33335 3.33337H12.6667C12.8435 3.33337 13.0131 3.40361 13.1381 3.52864C13.2631 3.65366 13.3334 3.82323 13.3334 4.00004C13.3334 4.17685 13.2631 4.34642 13.1381 4.47145C13.0131 4.59647 12.8435 4.66671 12.6667 4.66671H3.33335C3.15654 4.66671 2.98697 4.59647 2.86195 4.47145C2.73693 4.34642 2.66669 4.17685 2.66669 4.00004ZM2.66669 6.66671C2.66669 6.4899 2.73693 6.32033 2.86195 6.1953C2.98697 6.07028 3.15654 6.00004 3.33335 6.00004H12.6667C12.8435 6.00004 13.0131 6.07028 13.1381 6.1953C13.2631 6.32033 13.3334 6.4899 13.3334 6.66671C13.3334 6.84352 13.2631 7.01309 13.1381 7.13811C13.0131 7.26314 12.8435 7.33337 12.6667 7.33337H3.33335C3.15654 7.33337 2.98697 7.26314 2.86195 7.13811C2.73693 7.01309 2.66669 6.84352 2.66669 6.66671ZM2.66669 9.33337C2.66669 9.15656 2.73693 8.98699 2.86195 8.86197C2.98697 8.73695 3.15654 8.66671 3.33335 8.66671H12.6667C12.8435 8.66671 13.0131 8.73695 13.1381 8.86197C13.2631 8.98699 13.3334 9.15656 13.3334 9.33337C13.3334 9.51019 13.2631 9.67975 13.1381 9.80478C13.0131 9.9298 12.8435 10 12.6667 10H3.33335C3.15654 10 2.98697 9.9298 2.86195 9.80478C2.73693 9.67975 2.66669 9.51019 2.66669 9.33337ZM2.66669 12C2.66669 11.8232 2.73693 11.6537 2.86195 11.5286C2.98697 11.4036 3.15654 11.3334 3.33335 11.3334H12.6667C12.8435 11.3334 13.0131 11.4036 13.1381 11.5286C13.2631 11.6537 13.3334 11.8232 13.3334 12C13.3334 12.1769 13.2631 12.3464 13.1381 12.4714C13.0131 12.5965 12.8435 12.6667 12.6667 12.6667H3.33335C3.15654 12.6667 2.98697 12.5965 2.86195 12.4714C2.73693 12.3464 2.66669 12.1769 2.66669 12Z" fill="#1E1E1E"/>
                                    </svg>
                                  </div>
                                  <span className="w80p">{child.name}</span>
                                  <div className="w20p">
                                    <button onClick={() => setUpdateCategoryForm(child)}>수정</button>
                                    <button onClick={() => deleteCategory(child.uid)}>삭제</button>
                                  </div>
                                </div>
                              )}
                              </SortableItem>
                            </>
                          )}
                        </div>
                      ))}
                    </SortableContext>
                  </DndContext>
                </div>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      );
    };

    //카테고리 추가
    const setInsertFrom = () => (
      <div className="category-row add-form">
          <div className="w60p">
            <input className="w100p" placeholder="카테고리명" value={insertForm.name} onChange={(e) => setInsertForm({ ...insertForm, name: e.target.value })}/>
          </div>
          <div className="w20p">
            <select className="w100p" value={insertForm.upCategory} onChange={(e) => setInsertForm({ ...insertForm, upCategory: e.target.value })}>
              <option value="0">(상위 없음)</option>
              {categoryList.filter((c) => c.upCategory === 0).map((p) => (
                <option key={p.uid} value={p.uid}>
                    {p.name}
                  </option>
              ))}
            </select>
          </div>
          <div className="w20p">
            <button onClick={insertCategory}>추가</button>
            <button onClick={() => cancelInsertCategory()}>취소</button>
          </div>
      </div>
    );

    const insertCategory = async () => {
        if (!insertForm.name.trim()) return alert('카테고리명을 입력하세요');

        const param = {
            groupUid: groupUid,
            name: insertForm.name,
            upCategory: insertForm.upCategory,
            order: Number(insertForm.order),
        };

        try {
            const res = await axios.post("/setting/category/insertCategory", param);
            if(res.data.status === 'success') {
                getCategoryList()
                setInsertForm({ name: '', upCategory: 0, order: 1 });
                setIsAdding(false);
            }else{
                alert(res.data.message);
            }
        } catch (err) {
            console.error("데이터 가져오기 실패", err);
        }
    }

    const cancelInsertCategory = () => {
      setIsAdding(false)
      setInsertForm({name: '', upCategory: 0})
    }

    // update
    const setUpdateCategoryForm = (cat) => {
        setEditingId(cat.uid);
        setUpdateForm({
            uid: cat.uid,
            name: cat.name,
            upCategory: cat.upCategory
        })
    } 

    const updateCategory = async () => {
        if (!updateForm.name.trim()) return alert('카테고리명을 입력하세요');

        const param = {
            groupUid: groupUid,
            uid: updateForm.uid,
            name: updateForm.name,
            upCategory: updateForm.upCategory === '' ? null : Number(updateForm.upCategory),
            order: Number(updateForm.order),
        };

        try {
            const res = await axios.post("/setting/category/updateCategory", param);
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

    const cancelUpdateCategory = () => {
      setEditingId(null)
      setUpdateForm({uid: 0, name: '', upCategory: 0})
    }

    //delete
    const deleteCategory = async (uid) => {
        let param = {
            groupUid: groupUid,
            uid: uid
        }

        try {
            const res = await axios.post("/setting/category/deleteCategory", param); 
            if(res.data.status === 'success') {
                getCategoryList()
            }else{
                alert(res.data.message);
            }
        } catch (err) {
            console.error("데이터 가져오기 실패", err);
        }
    }


    //dnd-kit
    const SortableItem = ({ id, children, isEditing = false}) => {
      const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({ id, disabled: isEditing });

      const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };

      return (
        <div ref={setNodeRef} style={style} {...attributes}>
          {children(listeners)}
        </div>
      )
    };

    const handleParentDragEnd = (event) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = categoryList.findIndex(
        (item) => item.uid === active.id
      );
      const newIndex = categoryList.findIndex(
        (item) => item.uid === over.id
      );

      if (oldIndex < 0 || newIndex < 0) return;

      const newList = arrayMove(categoryList, oldIndex, newIndex).map((item, idx) => ({
          ...item, order: idx + 1
        })
      );

      setCategoryList(newList);
    };

    const handleChildDragEnd = (event, parentUid) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const parentIndex = categoryList.findIndex(
        (item) => item.uid === parentUid
      );
      const children = categoryList[parentIndex].categoryList;

      const oldIndex = children.findIndex((c) => c.uid === active.id);
      const newIndex = children.findIndex((c) => c.uid === over.id);

      const newChildren = arrayMove(children, oldIndex, newIndex).map((child, idx) => ({
          ...child, order: idx + 1,
        })
      );

      const newList = [...categoryList];
      newList[parentIndex] = {
        ...newList[parentIndex],
        categoryList: newChildren,
      };

      setCategoryList(newList);
    };

    const saveOrder = async () => {
      try {
        const res = await axios.post("/setting/category/updateOrder", categoryList); 
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
        {setCategory()}

        <button className="add-toggle-btn" onClick={() => saveOrder()}>순서 저장</button>
        </div>
    )
}

export default Category;
