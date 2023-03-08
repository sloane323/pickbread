
const PointModal = (props) => {
    const { open, close } = props;

    return ( <div>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section>
            <header>
            포인트모달
            </header>
            <button className="close" onClick={close}>
              X
            </button>
          </section>
        ) : null}
      </div>
    </div>  );
}
 
export default PointModal;