import PaymentMain from "./Payment/PaymentMain";

const PaymentMode = (props) => {
    const { open, close ,selectedProduct , totalPrice ,setSelectedProductHandler} = props;
    
    return ( <div> 
        <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header> <PaymentMain  selectedProduct={selectedProduct} totalPrice={totalPrice} setSelectedProductHandler={setSelectedProductHandler}/>  </header>
           <button className="close" onClick={close}>
              X 
            </button>
        </section>
      ) : null}
    </div>
    </div> );
}
 
export default PaymentMode;