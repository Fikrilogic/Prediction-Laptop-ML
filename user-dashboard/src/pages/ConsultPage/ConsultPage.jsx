import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./ConsultPage.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  ConsultResult,
  FailRequest,
  PostConsult,
} from "../../Redux/User/action";
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

const ConsultPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  // const cpuList = [
  //   "Intel Core i7",
  //   "Intel Core i5",
  //   "Intel Core i3",
  //   "Intel Celeron",
  //   "Intel Atom",
  //   "AMD E-Series",
  //   "AMD FX",
  //   "AMD Ryzen",
  // ];

  // const gpuList = [
  //   "Intel Iris Plus Graphic",
  //   "AMD Radeon 5xx",
  //   "AMD Radeon RX",
  //   "AMD Radeon 520",
  //   "AMD Radeon R",
  //   "Nvidia GeForce",
  //   "Intel HD Graphics",
  //   "AMD Radeon Pro",
  //   "Intel UHD Graphics",
  //   "Intel Iris Pro Graphics",
  //   "Intel UHD Graphic",
  //   "Nvidia GeForce GTX",
  //   "Intel Iris Graphics",
  //   "AMD Radeon Pro 555",
  // ];

  // const laptopType = [
  //   "ultrabook",
  //   "gaming",
  //   "notebook",
  //   "netbook",
  //   "2 in 1 convertible",
  // ];

  // const screenList = [
  //   "IPS Panel Retina Display",
  //   "IPS Panel Full HD / Touchscreen",
  //   "IPS Panel Full HD",
  //   "HD",
  //   "JD",
  //   "Full HD",
  // ];

  // const kebutuhanList = [
  //   "Kerja Kantor",
  //   "Gaming",
  //   "Penggunaan Biasa",
  //   "Desain",
  // ];

  // const storageList = ["HDD", "SSD", "SSD + HDD", "Flash Storage"];

  // const companyList = ["Dell", "HP", "Lenovo", "MSI", "Asus", "Apple", "Acer"];

  // const resolutionList = [
  //   "1920x1080",
  //   "2560x1600",
  //   "1440x900",
  //   "1920x1080",
  //   "1366x768",
  // ];

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
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      kebutuhan,
      budget,
      cpu,
      gpu,
      weight,
      memory,
      company,
      screen,
      sc_res,
      type,
      ram,
      price,
    } = data;
    try {
      const req = await axios.post(
        URL + "ml/konsultasi/all_method_predict/",
        {
          kebutuhan,
          budget,
          cpu,
          gpu,
          ram,
          memory,
          company,
          screen,
          resolution: sc_res,
          weight,
          type_laptop: type,
          price,
        },
        { withCredentials: true }
      );
      if (req.data) {
        dispatch(ConsultResult(req.data));
        return navigate("/consult/results");
      }
      console.log(req);
    } catch (e) {
      dispatch(FailRequest());
    }
    console.log(data);
  };

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
    <div className="container-consult">
      <div className="container-consult-header">
        <div className="container-consult-header-title">
          <h1>Laptop Consultation</h1>
        </div>

        <div className="container-consult-message">
          <p>
            If you have difficulty in choosing a laptop that is right for you.
            Please fill in the data in the form below. We will help you in
            choosing a laptop that suits your wishes
          </p>
        </div>
      </div>
      <div className="container-consult-body">
        <form className="" autoComplete="off">
          <div className="form-field grid p-fluid">
            <label htmlFor="kebutuhan" className="col-12 md:col-2 ">
              Kebutuhan
            </label>
            <div className="col-12 md:col-10">
              <Dropdown
                required
                id="kebutuhan"
                options={kebutuhanList}
                value={data.kebutuhan}
                placeholder="Select The Need For This Laptop"
                className="p-component"
                onChange={(e) =>
                  setData({ ...data, kebutuhan: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-field grid p-fluid">
            <label htmlFor="Budget" className="col-12 md:col-2 ">
              Budget
            </label>
            <div className="col-12 md:col-10">
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
          <div className="form-field grid p-fluid">
            <label htmlFor="CPU" className="col-12 md:col-2 ">
              CPU (Processor)
            </label>
            <div className="col-12 md:col-10">
              <Dropdown
                required
                id="CPU"
                options={cpuList}
                value={data.cpu}
                className="p-component"
                placeholder="Select CPU"
                onChange={(e) => setData({ ...data, cpu: e.target.value })}
              />
            </div>
          </div>
          <div className="form-field grid p-fluid">
            <label htmlFor="GPU" className="col-12 md:col-2 ">
              GPU (Graphic Card)
            </label>
            <div className="col-12 md:col-10">
              <Dropdown
                required
                id="GPU"
                options={gpuList}
                className="p-component"
                value={data.gpu}
                placeholder="Select GPU"
                onChange={(e) => setData({ ...data, gpu: e.target.value })}
              />
            </div>
          </div>
          <div className="form-field grid p-fluid">
            <label htmlFor="Memory" className="col-12 md:col-2 ">
              Penyimpanan
            </label>
            <div className="col-12 md:col-10">
              <Dropdown
                required
                id="Memory"
                options={storageList}
                className="p-component"
                value={data.memory}
                placeholder="Select Storage Type"
                onChange={(e) => setData({ ...data, memory: e.target.value })}
              />
            </div>
          </div>
          <div className="form-field grid p-fluid">
            <label htmlFor="RAM" className="col-12 md:col-2 ">
              RAM
            </label>
            <div className="col-12 md:col-10">
              <Dropdown
                required
                id="RAM"
                value={data.ram}
                placeholder="Select How Many RAM"
                onChange={(e) => setData({ ...data, ram: e.target.value })}
                options={[2, 4, 8, 16, 32]}
                className="p-component"
              />
            </div>
          </div>
          <div className="form-field grid p-fluid">
            <label htmlFor="Type" className="col-12 md:col-2 ">
              Tipe Laptop
            </label>
            <div className="col-12 md:col-10">
              <Dropdown
                required
                id="Type"
                options={typeList}
                className="p-component"
                value={data.type}
                placeholder="Select Laptop Type"
                onChange={(e) => setData({ ...data, type: e.target.value })}
              />
            </div>
          </div>
          <div className="form-field grid p-fluid">
            <label htmlFor="company" className="col-12 md:col-2 ">
              Produsen Laptop
            </label>
            <div className="col-12 md:col-10">
              <Dropdown
                required
                id="company"
                options={companyList}
                className="p-component"
                value={data.company}
                placeholder="Select Company"
                onChange={(e) => setData({ ...data, company: e.target.value })}
              />
            </div>
          </div>
          <div className="form-field grid p-fluid">
            <label htmlFor="screen" className="col-12 md:col-2 ">
              Tipe Layar
            </label>
            <div className="col-12 md:col-10">
              <Dropdown
                required
                id="screen"
                options={screenList}
                className="p-component"
                value={data.screen}
                placeholder="Select Screen Type"
                onChange={(e) => setData({ ...data, screen: e.target.value })}
              />
            </div>
          </div>
          <div className="form-field grid p-fluid">
            <label htmlFor="resolution" className="col-12 md:col-2 ">
              Resolusi Layar
            </label>
            <div className="col-12 md:col-10">
              <Dropdown
                required
                id="resolution"
                options={resolutionList}
                className="p-component"
                value={data.sc_res}
                placeholder="Select Screen Resolution"
                onChange={(e) => setData({ ...data, sc_res: e.target.value })}
              />
            </div>
          </div>
          <div className="form-field grid p-fluid">
            <label htmlFor="weight" className="col-12 md:col-2 ">
              Berat (dalam Kg)
            </label>
            <div className="col-12 md:col-10">
              <InputText
                required
                id="weight"
                type="text"
                className="p-inputtext p-component"
                onChange={(e) => setData({ ...data, weight: e.target.value })}
              />
            </div>
          </div>
          <div className="form-field grid p-fluid">
            <label htmlFor="price" className="col-12 md:col-2 ">
              Harga
            </label>
            <div className="col-12 md:col-10">
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
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConsultPage;
