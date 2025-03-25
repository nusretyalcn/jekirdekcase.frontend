import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import CustomerTable from "../components/CustomerTable";
import CustomerForm from "../components/CustomerForm";
import CustomerFilter from "../components/CustomerFilter"
import CustomerService from "../services/CustomerService";
import './CustomersPage.css'; 

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    region: "",
    startDate: "",
    endDate: "",
  });

  const params = {}; 
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    CustomerService.getCustomers(token)
      .then((res) => {
        setCustomers(res.data.data)
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  
  const applyFilter = () => {
    if (filters.firstName) params.firstName = filters.firstName;
    if (filters.lastName) params.lastName = filters.lastName;
    if (filters.email) params.email = filters.email;
    if (filters.region) params.region = filters.region;
    if (filters.startDate) params.startDate = filters.startDate;
    if (filters.endDate) params.endDate = filters.endDate;

    console.log("Filters:", params); // ✅ Debug için log ekle

    CustomerService.getFilteredCustomers(token, params) // `getFilteredCustomers` fonksiyonunu kullanarak filtreli verileri alıyoruz
      .then((res) => {
        setCustomers(res.data.data)
        console.log("Filtered Customers:", res.data.data); // ✅ Debug için log ekle
        setVisibleFilter(false)
      }) 
   
      .catch(() => navigate("/login"));
  };

  const saveCustomer = (customerData) => {
    CustomerService.addCustomer(customerData, token)
      .then((res) => {
        window.location.reload(); // ✅ Sayfa yenilemeden state güncelle
        setVisible(false);
      })
      .catch((err) => {
        console.error("Hata oluştu:", err);
      });
  };

  const deleteCustomer = (deletedCustomer) => {
    CustomerService.deleteCustomer(deletedCustomer, token)
      .then((res) => {
        setCustomers(customers.filter((c) => c.id !== deletedCustomer.id));
      })
      .catch((err) => {
        console.error("Hata oluştu:", err);
      });
  };

  const updateCustomer = (customerData) => {
    CustomerService.updateCustomer(customerData, token)
      .then((res) => {
        window.location.reload()
        setVisible(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container" style={{ position: "relative" }}>
      {/* Yeni Müşteri Ekleme Butonu */}
      
      <Button
        label="Ekle"
        id="addCustomerButton"
        icon="pi pi-plus"
        onClick={() => {
          setCustomer({ firstName: "", lastName: "", email: "", region: "", registrationDate: "" });
          setVisible(true);
        }}
        className="p-button-success"

      />
            {/* Filtreleme Butonu */}
      <Button
        label="Filtrele"
        id="addFilterButton"
        icon="pi pi-filter"
        onClick={() => {
            setFilters({ firstName: "", lastName: "", email: "", region: "", registrationDate: "" });
            setVisibleFilter(true);
          }}
        className="p-button-info"
  
      />

      {/* Müşteri Tablosu */}
      <CustomerTable
        customers={customers}
        setCustomer={setCustomer}
        setVisible={setVisible}
        deleteCustomer={deleteCustomer}
        updateCustomer={updateCustomer} // ✅ `updateCustomer` fonksiyonunu ekledik
      />

      {/* Müşteri Bilgi Formu (Dialog) */}
      <Dialog
        header="Müşteri Bilgileri"
        visible={visible}
        onHide={() => setVisible(false)} // Dialog kapanınca sadece visible'ı false yapıyoruz
        className="dialog"
      >
        <CustomerForm
          customer={customer}
          setCustomer={setCustomer}
          saveCustomer={customer?.id ? updateCustomer : saveCustomer}
          updateCustomer={updateCustomer}
        />
      </Dialog>

      <Dialog
        header="Müşteri Filtreleme"
        visible={visibleFilter}
        onHide={() => setVisibleFilter(false)} // Dialog kapanınca sadece visible'ı false yapıyoruz
        className="dialog"
      >
        <CustomerFilter
          filters={filters}
          setFilters={setFilters}
          applyFilter={applyFilter} // Apply filter fonksiyonunu burada kullanıyoruz
        />
      </Dialog>
    </div>
  );
};

export default CustomersPage;
