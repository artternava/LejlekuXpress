import React, { useState, useEffect } from "react";
import { MDBModal }from "mdb-react-ui-kit";
import axios from "axios";
import useAuthToken from "../components/useAuthToken";

function Shabllon() {
  const { userId } = useAuthToken();
  const [isShabllonVisible, setIsShabllonVisible] = useState(false);
  const [lookups, setLookups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShabllon, setSelectedShabllon] = useState(null);
  const [shabllon, setShabllon] = useState([]);
  const [newShabllon, setNewShabllon] = useState({
    name: "",
    nrOfPlayers: "",
    stadium: "",
  });
  const [formErrors, setFormErrors] = useState({
    Name: false,
    NrOfPlayers: false,
    Stadium: false,
  });
//#region HandleChange
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewShabllon((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: false,
    }));
  };
  const handleSelectedInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedShabllon((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: false,
    }));
  };
//#endregion
  
const toggleShabllonForm = () => {
    setIsShabllonVisible(!isShabllonVisible);
  };
  useEffect(() => {
    fetchLookups();
    fetchShabllon();
  }, [userId]);

//#region Lookup
  const getLookupName = (lookupId) => {
    const lookup = lookups.find((lookup) => lookup.id === lookupId);
    return lookup ? lookup.name : "";
  };

  const fetchLookups = async () => {
    try {
      const lookupResponse = await axios.get(
        "http://localhost:39450/api/Lookup/getall"
      );
      if (lookupResponse.status === 200) {
        const lookupData = lookupResponse.data;
        setLookups(lookupData);
      } else {
        console.error("Failed to fetch lookup data");
      }
    } catch (error) {
      console.error("Error fetching lookup:", error);
    }
  };
//#endregion

//#region Fetch
  const fetchShabllon = async () => {
    try {
      const response = await axios.get(
        `http://localhost:39450/api/Shabllon/getall`
      );
      if (response.status === 200) {
        const data = response.data;
        setShabllon(data);
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
//#endregion

//#region Add
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, nrOfPlayers, stadium } = newShabllon;
    const errors = {
      name: name.length === 0,
      nrOfPlayers: nrOfPlayers.length === 0,
      stadium: stadium.length === 0,
    };
    setFormErrors(errors);
    if (Object.values(errors).some((value) => value)) {
      return;
    }

    axios
      .post("http://localhost:39450/api/Shabllon/add", newShabllon)
      .then((response) => {
        console.log("Registration successful", response.data);
        window.alert("Registration successful");
        window.location.href = "/Shabllon";
      })
      .catch((error) => {
        console.error("Registration failed", error);
        window.alert("Registration failed");
      });
  };
//#endregion

//#region Delete
  const deleteShabllon = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Shabllon?"
      );
      if (confirmDelete) {
        await axios.delete(
          `http://localhost:39450/api/Shabllon/delete?id=${id}`
        );
        fetchShabllon();
        window.location.href = "/Shabllon";
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
//#endregion

//#region Update
  const updateAddress = async (id) => {
    try {
      const { name, nrOfPlayers, stadium } = selectedShabllon;
      const errors = {
        name: name && name.length === 0,
        nrOfPlayers: nrOfPlayers && nrOfPlayers.length === 0,
        stadium: stadium && stadium.length === 0,
      };

      setFormErrors(errors);
      if (Object.values(errors).some((value) => value)) {
        return;
      }
      console.log(selectedShabllon);

      const confirmUpdate = window.confirm(
        "Are you sure you want to update this Shabllon?"
      );
      if (confirmUpdate) {
        await axios.put(
          `http://localhost:39450/api/Shabllon/update?id=${id}`,
          selectedShabllon
        );
        fetchShabllon();
        closeModal();
        window.location.href = "/Shabllon";
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
//#endregion

//#region Modal
const openModal = (shabllon) => {
    setSelectedShabllon(shabllon);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
//#endregion
  return (
    <div id="shippingInfo">
      <div
        id="addressList"
        style={{ display: isShabllonVisible ? "none" : "block" }}
      >
        <div className="container-userdashboard-tabs">
          <div
            className="d-flex justify-content-between align-items-center"
            style={{
              padding: "10px",
              width: "95%",
              backgroundColor: "#fff",
              margin: "auto",
              borderRadius: "10px",
            }}
          >
            <h1 style={{ fontSize: "35px", fontWeight: "400", padding: "5px" }}>
              Shabllons
            </h1>
            <button
              className="btn btn-primary me-2"
              type="button"
              onClick={toggleShabllonForm}
            >
              Add Shabllon
            </button>
          </div>
          <div className="container rounded bg-white mt-5 mb-5 ">
            <div className="row" style={{ backgroundColor: "#bdbdbd" }}>
              <div className="col-md-12">
                <div className="grid-container">
//#region ForEach
                  {shabllon.map((shabllon) => (
                    <div className="grid-item p-3 py-1" id="edit-address">
                      <div className="d-flex justify-content-between align-items-center mb-3 my-3 flex-wrap">
                        <div>
                          <div className="d-flex align-items-center">
                            <i className="bi bi-person-fill me-2"></i>
                            <h6 className="text-right w-100">
                              {shabllon.name} {shabllon.stadium}
                            </h6>
                          </div>
                          <div className="d-flex align-items-start mt-2">
                            <i class="bi bi-house-door me-2"></i>
                            <div>
                              <p>{shabllon.nrOfPlayers}</p>
                            </div>
                          </div>
                        </div>
                        <div className="w-100">
                          <div className="row mt-2 text-center">
                            <div className="col-md-12">
                              <button
                                className="btn btn-danger me-2"
                                type="button"
                                onClick={() => deleteShabllon(shabllon.id)}
                              >
                                Delete
                              </button>
                              <button
                                className="btn btn-primary me-2 ml-3"
                                type="button"
                                onClick={() => openModal(shabllon)}
                              >
                                Update Shabllon
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
//#endregion
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
//#region Modal
      <MDBModal show={isModalOpen} onHide={closeModal}>
        <div
          className="custom-modal"
          style={{
            backgroundColor: "#fff",
            width: "50%",
            margin: "auto",
            padding: "20px",
            borderRadius: "20px",
            marginTop: "5%",
          }}
        >
          <div
            className="custom-modal-header"
            style={{ display: "flex", alignItems: "center" }}
          >
            <h5 className="modal-title mb-3" style={{ marginRight: "auto" }}>
              Address Details
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="custom-modal-body">
            {selectedShabllon && (
              <div className="p-3">
                <div className="container rounded bg-white mb-5">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="p-3 py-5">
                        <div className="row mt-2">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="name" className="labels">
                                name
                              </label>
                              <input
                                type="text"
                                id="name"
                                className="form-control"
                                placeholder="name"
                                name="name"
                                value={selectedShabllon.name}
                                onChange={handleSelectedInputChange}
                              />
                              {formErrors.FirstName && (
                                <p className="text-danger">name is required</p>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="stadium" className="labels">
                                stadium
                              </label>
                              <input
                                type="text"
                                id="stadium"
                                className="form-control"
                                placeholder="stadium"
                                name="stadium"
                                value={selectedShabllon.stadium}
                                onChange={handleSelectedInputChange}
                              />
                              {formErrors.LastName && (
                                <p className="text-danger">
                                  stadium is required
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="nrOfPlayers" className="labels">
                                nrOfPlayers
                              </label>
                              <input
                                type="number"
                                id="nrOfPlayers"
                                className="form-control"
                                placeholder="nrOfPlayers"
                                name="nrOfPlayers"
                                value={selectedShabllon.nrOfPlayers}
                                onChange={handleSelectedInputChange}
                              />
                              {formErrors.city && (
                                <p className="text-danger">City is required</p>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="country" className="labels">
                                Country
                              </label>
                              <select
                                className={`form-control ${
                                  formErrors.countryCode ? "is-invalid" : ""
                                }`}
                                id="countryId"
                                name="countryId"
                                value={selectedShabllon.lookupId}
                                onChange={handleSelectedInputChange}
                              >
                                <option value="">Select Lookup</option>
                                {lookups.map((lookup) => (
                                  <option key={lookup.id} value={lookup.id}>
                                    {lookup.name}
                                  </option>
                                ))}
                              </select>
                              {formErrors.lookupId && (
                                <p className="text-danger">
                                  Lookup is required
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <button
                    className="btn btn-primary me-2"
                    type="submit"
                    onClick={() => updateAddress(selectedShabllon.id)}
                  >
                    Save Shabllon
                  </button>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </MDBModal>
//#endregion

//#region Add
      <div
        id="add-edit-address"
        style={{ display: isShabllonVisible ? "block" : "none" }}
        className="container-userdashboard-tabs">
        <div className="container rounded bg-white mt-5 mb-5">
          <div className="row">
            <div className="col-md-12">
              <div className="p-3 py-5">
                <div className="row mt-2">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name" className="labels">
                        name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        placeholder="name"
                        name="name"
                        value={shabllon.name}
                        onChange={handleInputChange}
                      />
                      {formErrors.name && (
                        <p className="text-danger">name is required</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="stadium" className="labels">
                        stadium
                      </label>
                      <input
                        type="text"
                        id="stadium"
                        className="form-control"
                        placeholder="stadium"
                        name="stadium"
                        value={shabllon.stadium}
                        onChange={handleInputChange}
                      />
                      {formErrors.stadium && (
                        <p className="text-danger">stadium is required</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="nrOfPlayers" className="labels">
                        nrOfPlayers
                      </label>
                      <input
                        type="number"
                        id="nrOfPlayers"
                        className="form-control"
                        placeholder="nrOfPlayers"
                        name="nrOfPlayers"
                        value={shabllon.nrOfPlayers}
                        onChange={handleInputChange}
                      />
                      {formErrors.nrOfPlayers && (
                        <p className="text-danger">Field is required</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="country" className="labels">
                        Country
                      </label>
                      <select
                        className={`form-control ${
                          formErrors.countryCode ? "is-invalid" : ""
                        }`}
                        id="countryId"
                        name="countryId"
                        value={shabllon.countryId}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Country</option>
                        {lookups.map((lookup) => (
                          <option key={lookup.id} value={lookup.id}>
                            {lookup.name}
                          </option>
                        ))}
                      </select>
                      {formErrors.lookupId && (
                        <p className="text-danger">Lookup is required</p>
                      )}
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <button
                      className="btn btn-primary profile-button me-2"
                      type="submit"
                      onClick={handleFormSubmit}
                    >
                      Save Shabllon
                    </button>
                    <button
                      className="btn btn-danger profile-button"
                      onClick={toggleShabllonForm}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
//#endregion
    </div>
  );
}

export default Shabllon;
