import axios from "axios";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { URL } from "../../Context/action";
import {
  FetchCompany,
  FetchCpu,
  FetchGpu,
  FetchKebutuhan,
  FetchLaptopType,
  FetchScreenResolution,
  FetchScreenType,
  FetchStorage,
} from "../../Redux/Data/fetch-action";
import { FailRequest } from "../../Redux/User/action";
import "./SurveyPage.scss";

const SurveyPage = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const cpuList = useSelector((state) => state.data.cpu).map(
    (data) => data.name
  );
  const gpuList = useSelector((state) => state.data.gpu).map(
    (data) => data.name
  );
  const storageList = useSelector((state) => state.data.storage).map(
    (data) => data.type
  );
  const screenList = useSelector((state) => state.data.screen).map(
    (data) => data.type
  );
  const resolutionList = useSelector((state) => state.data.resolution).map(
    (data) => data.resolution
  );
  const typeList = useSelector((state) => state.data.laptop_type).map(
    (data) => data.name
  );
  const kebutuhanList = useSelector((state) => state.data.kebutuhan).map(
    (data) => data.name
  );
  const companyList = useSelector((state) => state.data.company).map(
    (data) => data.name
  );

  const saveHandler = async (e) => {
    e.preventDefault();
    try {
      const req = await axios.post(URL + "dataset/", data, {
        withCredentials: true,
      });
      if (req.data) {
        console.log("add data berhasil");
        window.location.reload();
        toast.current.show({
          severity: "success",
          summary: "Survey Completed",
          detail: "Terima Kasih Telah Berpartisipasi Dalam Survey Ini",
          life: 3000,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch(FailRequest());
    }
  };

  const [data, setData] = useState({
    kebutuhan: "",
    budget: 0,
    cpu: "",
    gpu: "",
    ram: 0,
    memory: "",
    company: "",
    screen: "",
    sc_res: "",
    weight: "",
    type: "",
    price: 0,
    name: "",
  });

  useEffect(() => {
    dispatch(FetchCompany());
    dispatch(FetchStorage());
    dispatch(FetchScreenType());
    dispatch(FetchScreenResolution());
    dispatch(FetchLaptopType());
    dispatch(FetchKebutuhan());
    dispatch(FetchGpu());
    dispatch(FetchCpu());
  }, [dispatch]);

  return (
    <div className="container-survey">
      <Toast ref={toast} />
      <div className="container-survey-header mb-6">
        <h1>CREAVEN ONLINE SURVEY</h1>
      </div>
      <div className="dot"></div>
      <div className="container-survey-body py-6">
        <form className="" autoComplete="off" onSubmit={saveHandler}>
          <div className="form-field p-fluid">
            <label htmlFor="name" className="col-12  ">
              Apakah Nama Model Laptop Yang Anda Punya?
            </label>
            <div className="col-12 ">
              <InputText
                required
                id="name"
                type="text"
                className="p-inputtext p-component"
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
          </div>
          <div className="form-field p-fluid">
            <label htmlFor="kebutuhan" className="col-12  ">
              Kegiatan Utama Yang Anda Biasa Lakukan Dengan Laptop Anda?
            </label>
            <div className="col-12 ">
              <Dropdown
                required
                id="kebutuhan"
                options={kebutuhanList}
                value={data.kebutuhan}
                className="p-component"
                onChange={(e) =>
                  setData({ ...data, kebutuhan: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-field p-fluid">
            <label htmlFor="Budget" className="col-12  ">
              Berapakah Budget Yang Anda Miliki?
            </label>
            <div className="col-12 ">
              <InputText
                required
                id="Budget"
                type="text"
                className="p-inputtext p-component"
                onChange={(e) =>
                  setData({ ...data, budget: parseInt(e.target.value) })
                }
              />
            </div>
          </div>
          <div className="form-field p-fluid">
            <label htmlFor="CPU" className="col-12  ">
              Apakah Jenis Processor Dari Laptop Yang Anda Punya?
            </label>
            <div className="col-12 ">
              <Dropdown
                required
                id="CPU"
                options={cpuList}
                value={data.cpu}
                className="p-component"
                onChange={(e) => setData({ ...data, cpu: e.target.value })}
              />
            </div>
          </div>
          <div className="form-field p-fluid">
            <label htmlFor="GPU" className="col-12  ">
              Apakah Jenis Graphic Card Dari Laptop Yang Anda Punya?
            </label>
            <div className="col-12 ">
              <Dropdown
                required
                id="GPU"
                options={gpuList}
                className="p-component"
                value={data.gpu}
                onChange={(e) => setData({ ...data, gpu: e.target.value })}
              />
            </div>
          </div>
          <div className="form-field p-fluid">
            <label htmlFor="Memory" className="col-12  ">
              Tipe Media Penyimpanan Yand Terdapat Pada Laptop Anda?
            </label>
            <div className="col-12 ">
              <Dropdown
                required
                id="Memory"
                options={storageList}
                className="p-component"
                value={data.memory}
                onChange={(e) => setData({ ...data, memory: e.target.value })}
              />
            </div>
          </div>
          <div className="form-field p-fluid">
            <label htmlFor="RAM" className="col-12  ">
              Berapa RAM Dari Laptop Yang Anda Punya?
            </label>
            <div className="col-12 ">
              <Dropdown
                required
                id="RAM"
                value={data.ram}
                onChange={(e) => setData({ ...data, ram: e.target.value })}
                options={[2, 4, 8, 16, 32]}
                className="p-component"
              />
            </div>
          </div>
          <div className="form-field p-fluid">
            <label htmlFor="Type" className="col-12  ">
              Apakah Tipe Dari Laptop Yang Anda Punya?
            </label>
            <div className="col-12 ">
              <Dropdown
                required
                id="Type"
                options={typeList}
                className="p-component"
                value={data.type}
                onChange={(e) => setData({ ...data, type: e.target.value })}
              />
            </div>
          </div>
          <div className="form-field p-fluid">
            <label htmlFor="company" className="col-12  ">
              Apakah Merk Atau Produsen Laptop Yand Anda Punya?
            </label>
            <div className="col-12 ">
              <Dropdown
                required
                id="company"
                options={companyList}
                className="p-component"
                value={data.company}
                onChange={(e) => setData({ ...data, company: e.target.value })}
              />
            </div>
          </div>
          <div className="form-field p-fluid">
            <label htmlFor="screen" className="col-12  ">
              Apakah Tipe Layar Laptop Yang Anda Punya?
            </label>
            <div className="col-12 ">
              <Dropdown
                required
                id="screen"
                options={screenList}
                className="p-component"
                value={data.screen}
                onChange={(e) => setData({ ...data, screen: e.target.value })}
              />
            </div>
          </div>
          <div className="form-field p-fluid">
            <label htmlFor="resolution" className="col-12  ">
              Berapakah Resolusi Layar Laptop Yang Anda Punya?
            </label>
            <div className="col-12 ">
              <Dropdown
                required
                id="resolution"
                options={resolutionList}
                className="p-component"
                value={data.sc_res}
                onChange={(e) => setData({ ...data, sc_res: e.target.value })}
              />
            </div>
          </div>
          <div className="form-field p-fluid">
            <label htmlFor="weight" className="col-12  ">
              Weight (in Kg)
            </label>
            <div className="col-12 ">
              <InputText
                required
                id="weight"
                type="text"
                className="p-inputtext p-component"
                onChange={(e) => setData({ ...data, weight: e.target.value })}
              />
            </div>
          </div>
          <div className="form-field p-fluid">
            <label htmlFor="price" className="col-12  ">
              Berapakah Perkiraan Harga Dari Laptop Yang Anda Punya?
            </label>
            <div className="col-12 ">
              <InputText
                required
                id="price"
                type="text"
                onChange={(e) =>
                  setData({ ...data, price: parseInt(e.target.value) })
                }
                className="p-inputtext p-component"
              />
            </div>
          </div>
          <div className="text-center mt-3 mb-5">
            <Button
              label="SUBMIT"
              className="p-button-primary w-3 border-round"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SurveyPage;
