const PaymentMode = (props) => {
    const { open, close } = props;

    return ( <div> 
        <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header> 이건 결제  </header>
           <button className="close" onClick={close}>
              X 
            </button>
        </section>
      ) : null}
    </div>
    </div> );
}
 
export default PaymentMode;