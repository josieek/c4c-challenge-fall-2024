import React, {useState} from 'react';
import Dashboard from './Dashboard';

function AddPartner({onAddPartner}) {

  // partner data entry values
  const [nameValue, setNameValue] = useState('');
  const [urlValue, setUrlValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [isActive, setActiveValue] = useState(false);

  // makes a post request to the backend
  // sending the information about the new partner to be added to the database
  const getPartnerData = async () => {
      // Create a new partner object
      const newPartner = {
          name: nameValue,
          thumbnailUrl: urlValue,
          description: descriptionValue,
          isActive: isActive
      };

      try {
          const response = await fetch("http://localhost:4000/add-partner", { // Update the URL here
              method: "POST",
              headers: {
                  "Content-type": "application/json"
              },
              body: JSON.stringify(newPartner)
          });
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          const data = await response.json();

          // function from Dashboard which will add this partner
          onAddPartner(newPartner);
          console.log(data);
      } catch (error) {
          console.error("Error:", error);
      }

      setNameValue('');
      setUrlValue('');
      setDescriptionValue('');
      setActiveValue(false);
  }

return (

  <div id="main-content" > 
      <div className="add-partner-tile">
          <h1 className="add-partner-title">
              Add a partner
          </h1>
      
      <div className="partners-grid">
        <div className="grid-column">
          <div className="grid-item">Partner name </div>
          <div className="grid-item"><input 
          type="text" 
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
          /></div>
          <div className="grid-item">Partner logo source</div>
          <div className="grid-item"><input 
          type="text" 
          value={urlValue}
          onChange={(e) => setUrlValue(e.target.value)}/></div>
        </div>
        <div className="grid-column">
          <div className="grid-item">Partner description</div>
          <div className="grid-item"><input 
          type="text" 
          value={descriptionValue}
          onChange={(e) => setDescriptionValue(e.target.value)}/></div>
          <div className="grid-item">Active?</div>
          <div className="grid-item"><input 
          type="checkbox"
          checked={isActive}
          onChange={(e) => setActiveValue(e.target.checked)}
          /> </div>
        </div>
      </div>
          <button className="button" onClick = { getPartnerData}>Submit</button>
      </div>

  </div>
);
}

export default AddPartner;