import React, { useEffect, useState, createContext } from "react";
import Cards from "./Cards";
import Boat from "./Boat";
import Navbar from "./Navbar";
import Filters from "./Filters";
import axios from "axios";
import ReactSwitch from "react-switch";

const ThemeContext = createContext(null);

const App = () => {

  const [showCard, setShowCard] = useState(true);
  const [selectedRental, setSelectedRental] = useState(null);
  const [data, setData] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/rentals");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderBoatPage = (rentalId) => {
    setSelectedRental(rentalId);
  };

  const handleRemoveCard = () => {
    setShowCard(false);
  };

  const handleFilterApplied = () => {
    setShowCard(false);

  };


    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
      setTheme((curr) => (curr === "light" ? "dark" : "light"));
    };
   return (
    <ThemeContext.Provider value={[ theme, toggleTheme ]}>
      <div className="App" id={theme}>
          <form />

        <div className="Switch">
         <ReactSwitch className="rs" onChange={toggleTheme} checked={theme === "dark"} onColor="#333333" />
        </div>
         <Navbar onRemoveCard={handleRemoveCard} onChange={toggleTheme} checked={theme === "dark"} />
         <Filters onFilter={handleFilterApplied} />
  
         {selectedRental ? (
           <Boat rentalId={selectedRental} />
           ) : showCard && !filtersApplied ? (
             <Cards data={data} renderBoatPage={renderBoatPage} />
             ) : null}
  
         {/* Footer */}
      </div>
    </ThemeContext.Provider>
  );
  };

export default App;
