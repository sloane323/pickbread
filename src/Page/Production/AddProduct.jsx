import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  return (
    <div>
      <form onSubmit={""}>
        <input type="text" placeholder="제품 이름" />
        <div>
          <input type="text" placeholder="재료들" />
          <input type="button" value="재료 조회"></input>
        </div>
        <div>
          <input type="text" placeholder="재료들" />
          <input type="button" value="재료 조회"></input>
        </div>
        <div>
          <input type="text" placeholder="재료들" />
          <input type="button" value="재료 조회"></input>
        </div>
        <div>
          <input type="text" placeholder="재료들" />
          <input type="button" value="재료 조회"></input>
        </div>
        <div>
          <input type="text" placeholder="재료들" />
          <input type="button" value="재료 조회"></input>
        </div>
        <div>
          <input type="text" placeholder="재료들" />
          <input type="button" value="재료 조회"></input>
        </div>
        <input type="submit" value="등록" />
      </form>
    </div>
  );
};

export default AddProduct;
