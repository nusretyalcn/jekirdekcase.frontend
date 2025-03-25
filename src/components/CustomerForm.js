import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const CustomerForm = ({ customer, setCustomer, saveCustomer, updateCustomer }) => {
    const handleSubmit = () => {
        if (customer?.id) {
            console.log("Güncellenecek müşteri:", customer.id); // ✅ Debug için log ekle
            updateCustomer(customer); // Güncelleme işlemi
        } else {
            saveCustomer(customer); // Yeni ekleme işlemi
        }
    };

    return (
        <div>
            <div className="p-field">
                <label>Id</label>
                <InputText
                    value={customer.id}
                    disabled
                    style={{ width: "100%" }}
                />
            </div>

            <div className="p-field">
                <label>Ad</label>
                <InputText
                    value={customer.firstName}
                    onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })}
                    style={{ width: "100%" }}
                />
            </div>

            <div className="p-field">
                <label>Soyad</label>
                <InputText
                    value={customer.lastName}
                    onChange={(e) => setCustomer({ ...customer, lastName: e.target.value })}
                    style={{ width: "100%" }}
                />
            </div>

            <div className="p-field">
                <label>Email</label>
                <InputText
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    style={{ width: "100%" }}
                />
            </div>

            <div className="p-field">
                <label>Bölge</label>
                <InputText
                    value={customer.region}
                    onChange={(e) => setCustomer({ ...customer, region: e.target.value })}
                    style={{ width: "100%" }}
                />
            </div>

            <Button
                label={customer.id ? "Güncelle" : "Kaydet"} // Buton metnini duruma göre değiştir
                icon="pi pi-save"
                onClick={handleSubmit}
                className="p-button-success"
                style={{ width: "100%" }}
            />
        </div>
    );
};

export default CustomerForm;
