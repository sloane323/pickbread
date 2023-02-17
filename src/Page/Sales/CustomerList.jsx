const CustomerList = (props) => {
    const { open, close } = props;

    return ( <div> 
<div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header> 팝업 입니다 </header>
           <button className="close" onClick={close}>
              X 
            </button>
        </section>
      ) : null}
    </div>
    </div> );
}
 
export default CustomerList;