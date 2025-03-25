import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const CustomersTable = ({ customers, setCustomer, setVisible, deleteCustomer}) => {
    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "200px" }}>
          <div
            style={{
              width: "60%",
              minWidth: "400px",
              maxHeight: "600px", // Yüksekliği sınırlıyoruz
              overflowY: "auto",  // Dikey scroll ekliyoruz
            }}
          >
            <DataTable
              value={customers}
              paginator
              rows={10}
              responsiveLayout="scroll"
              style={{ fontSize: "16px" }}
            >
              <Column field="id" header="ID" style={{ width: "40px" }} />
              <Column field="firstName" header="Ad" style={{ width: "90px" }} />
              <Column field="lastName" header="Soyad" style={{ width: "90px" }} />
              <Column field="email" header="Email" style={{ width: "170px" }} />
              <Column field="region" header="Bölge" style={{ width: "110px" }} />
              <Column
                field="registrationDate"
                header="Kayıt Tarihi"
                style={{ width: "13 0px" }}
                body={(rowData) => new Date(rowData.registrationDate).toLocaleDateString("tr-TR")}
              />
      
              <Column
                header="İşlemler"
                body={(rowData) => (
                  <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                    <Button
                      label="Düzenle"
                      icon="pi pi-pencil"
                      onClick={() => {
                        setCustomer(rowData);
                        setVisible(true);
                      }}
                      className="p-button-warning p-button-sm"
                    />
                    <Button
                      label="Sil"
                      icon="pi pi-trash"
                      onClick={() => {
                        console.log("Silinecek müşteri:", rowData); // ✅ Debug için log ekle
                        deleteCustomer(rowData);
                      }}
                      className="p-button-danger p-button-sm"
                    />
                  </div>
                )}
                style={{ width: "170px", textAlign: "center" }}
              />
            </DataTable>
          </div>
        </div>
      );
  };

export default CustomersTable;