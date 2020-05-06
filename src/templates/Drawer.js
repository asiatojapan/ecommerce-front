import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import { isAuthenticated, isAuthenticates } from "../auth";
import { getFavStudents, destroyFav } from "../core/apiCore";
import { logout } from "../actions/session";

import CardCheckout from "../core/CardCheckout"
const mapStateToProps = ({ session }) => ({
session
});

const mapDispatchToProps = dispatch => ({
logout: () => dispatch(logout())
});

const Drawer = ({ isDrawerOpen, handleDrawers}) => {
    const { darwin_myTk, darwin_uid } = isAuthenticates();
   
    const [loading, setLoading] = useState(true)

    const [run, setRun] = useState(false);

    const [items, setItems] = useState([]);

    const init = () => {
        getFavStudents(darwin_uid, darwin_myTk).then(data => {
            setLoading(false)
            setItems(data)
        });
    };

    const destroy = s => {
        destroyFav(s, darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                init();
            }
            setLoading(false)
        });
    };

    const closeDrawer = () => {
        handleDrawers(false)
    }
    useEffect(() => {
        if (isDrawerOpen) {
        init(); }
    }, [isDrawerOpen]);

    return (
    <div className={`Drawer__Container ${isDrawerOpen && "Drawer__Container--isOpen"}`}>
          <div className="loading" style={{ display: loading ? "" : "none" }}>
                    <div className="loaderSpin"></div>
                </div>
        <div style={{padding: "0 1rem"}}>
        <div className="cartHeader"> 
        <span
          onClick={()=> closeDrawer()}
          className="close"
        >
        </span>   
    
        <div className="d-flex flex-column">
        <div className="d-flex align-items-center mt-auto"> 
        <h1 style={{marginTop: "1rem"}}>現在検討中の学生 {items.length} </h1> 
        {items.length > 0 ? 
             <Link to="/checkout" className="unlikeBtn resumeGradient">確認画面へ
             </Link> : null}
              </div>
            </div>
         </div>

            {items.map((s, index) => 
                   <> <CardCheckout key={index} student={s} showRemoveItemButton={true} cartUpdate={true} setRun={setRun} run={run} setLoading={setLoading} loading={loading} passedFunction={destroy}/>
                  </>
                  )} 
        </div>  
  </div>
  )
};


export default  Drawer;
