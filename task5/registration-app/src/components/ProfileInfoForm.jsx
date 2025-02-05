import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const ProfileInfoForm = ({ goToNextStep }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const selectedCountryCode = watch("selectedCountry");

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryList = response.data.map(country => ({
          name: country.name.common,
          code: country.cca2,
        }));
        countryList.sort((a, b) => a.name.localeCompare(b.name));
        setCountries(countryList);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchCities = async (countryCode) => {
      if (!countryCode) return;
      setLoading(true);
      try {
        const countryObj = countries.find(c => c.code === countryCode);
        if (!countryObj) {
          throw new Error("Country not found");
        }
        const response = await axios.post("https://countriesnow.space/api/v0.1/countries/cities", {
          country: countryObj.name
        });
        if (response.data.error) {
          console.error("API error:", response.data.msg);
          setCities([]);
        } else {
          setCities(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedCountryCode) {
      fetchCities(selectedCountryCode);
    }
  }, [selectedCountryCode, countries]);

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
    if (data.firstName && data.lastName && data.dateOfBirth && data.selectedCountry && data.selectedCity) {
      goToNextStep();
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Profile Info</h2>
      <p style={{ marginBottom: '10px', fontSize: '14px', color: 'gray' }}>
        Fill in the data for profile. It will take a couple of minutes. <br />
        You only need a passport.
      </p>

      <h3>Personal Data</h3>
      <p>Specify exactly as in your passport</p>

      <label htmlFor="first-name">First Name</label>
      <input 
        type="text" 
        id="first-name" 
        placeholder="Your first name" 
        {...register("firstName", { required: "First name is required" })} 
      />
      {errors.firstName && <span>{errors.firstName.message}</span>}

      <label htmlFor="last-name">Last Name</label>
      <input 
        type="text" 
        id="last-name" 
        placeholder="Your last name" 
        {...register("lastName", { required: "Last name is required" })} 
      />
      {errors.lastName && <span>{errors.lastName.message}</span>}

      <label htmlFor="date-of-birth">Date of Birth</label>
      <input 
        type="date" 
        id="date-of-birth" 
        {...register("dateOfBirth", { required: "Date of birth is required" })} 
      />
      {errors.dateOfBirth && <span>{errors.dateOfBirth.message}</span>}

      <div className="input-group">
        <div className="input-field">
          <label htmlFor="birth-place-country">Country</label>
          <select {...register("selectedCountry", { required: "Country is required" })}>
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.selectedCountry && <span>{errors.selectedCountry.message}</span>}
        </div>
        <div className="input-field">
          <label htmlFor="birth-place-city">City</label>
          <select {...register("selectedCity", { required: "City is required" })}>
            <option value="">Select Country First</option>
            {selectedCountryCode && cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
          {errors.selectedCity && <span>{errors.selectedCity.message}</span>}
        </div>
      </div>

      <h3>Identification Number</h3>
      <div className="id-number-container">
        <input 
          type="text" 
          id="id-number" 
          placeholder="Your ID number" 
          disabled 
          value="1234567890" 
        />
        <button type="submit">GO NEXT</button>
      </div>
    </form>
  );
};

export default ProfileInfoForm;
