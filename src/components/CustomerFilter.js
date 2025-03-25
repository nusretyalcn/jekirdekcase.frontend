import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";

const CustomerFilter = ({ filters, setFilters, applyFilter }) => {
    const handleSubmit = () => {
        console.log("Customerfilter filters:", filters); // ✅ Debug için log ekle
        applyFilter(filters); // Güncelleme işlemi

    };
    return (
        <div>
            <div className="p-field">
                <label>Ad</label>
                <InputText
                    value={filters.name}
                    onChange={(e) => {
                        const value = e.target.value;
                        // Eğer değer boş değilse, filter objesine region ekle
                        setFilters((prevFilters) => ({
                            ...prevFilters,
                            ...(value ? { firstName: value } : {}), // value varsa region ekler, yoksa eklemez
                        }));
                    }}
                    style={{ width: "100%" }}
                />
            </div>

            <div className="p-field">
                <label>Soyad</label>
                <InputText
                    value={filters.lastName}
                    onChange={(e) => {
                        const value = e.target.value;
                        // Eğer değer boş değilse, filter objesine region ekle
                        setFilters((prevFilters) => ({
                            ...prevFilters,
                            ...(value ? { last: value } : {}), // value varsa region ekler, yoksa eklemez
                        }));
                    }}
                    style={{ width: "100%" }}
                />
            </div>

            <div className="p-field">
                <label>Email</label>
                <InputText
                    value={filters.email}
                    onChange={(e) => {
                        const value = e.target.value;
                        // Eğer değer boş değilse, filter objesine region ekle
                        setFilters((prevFilters) => ({
                            ...prevFilters,
                            ...(value ? { email: value } : {}), // value varsa region ekler, yoksa eklemez
                        }));
                    }}
                    style={{ width: "100%" }}
                />
            </div>

            <div className="p-field">
                <label>Bölge</label>
                <InputText
                    value={filters.region}
                    onChange={(e) => {
                        const value = e.target.value;
                        // Eğer değer boş değilse, filter objesine region ekle
                        setFilters((prevFilters) => ({
                            ...prevFilters,
                            ...(value ? { region: value } : {}), // value varsa region ekler, yoksa eklemez
                        }));
                    }}
                    style={{ width: "100%" }}
                />
            </div>
            <div className="p-field">
                <label>Başlangıç Tarihi</label>
                <Calendar
                    value={filters.startDate ? new Date(filters.startDate) : null}
                    onChange={(e) => {
                        const value = e.target.value;
                        const date = new Date(e.value);
                        const localDate = new Date(e.value.getTime() - e.value.getTimezoneOffset() * 60000);
                        const formattedDate = localDate.toISOString().split('T')[0];
                        // Eğer değer boş değilse, filter objesine region ekle
                        setFilters((prevFilters) => ({
                            ...prevFilters,
                            ...(value ? { startDate: formattedDate } : {}), // value varsa region ekler, yoksa eklemez
                        }));
                    }}
                    dateFormat="yy-mm-dd"
                    showIcon
                    style={{ width: "100%" }}
                />
            </div>

            <div className="p-field">
                <label>Bitiş Tarihi</label>
                <Calendar
                    value={filters.endDate ? new Date(filters.endDate) : null}
                    onChange={(e) => {
                        const value = e.target.value;
                        const date = new Date(e.value);
                        const localDate = new Date(e.value.getTime() - e.value.getTimezoneOffset() * 60000);
                        const formattedDate = localDate.toISOString().split('T')[0];
                        // Eğer değer boş değilse, filter objesine region ekle
                        setFilters((prevFilters) => ({
                            ...prevFilters,
                            ...(value ? { endDate: formattedDate } : {}), // value varsa region ekler, yoksa eklemez
                        }));
                    }}
                    dateFormat="yy-mm-dd"
                    showIcon
                    style={{ width: "100%" }}
                />
            </div>

            <Button
                label="Filtrele"
                icon="pi pi-filter"
                onClick={handleSubmit}
                className="p-button-success"
                style={{ width: "100%" }}
            />
        </div>
    );
};

export default CustomerFilter;
