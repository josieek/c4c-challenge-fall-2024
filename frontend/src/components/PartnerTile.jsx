import React from 'react';

/*
  A block for a single partner, containing information for them
  along with any tools to manage said information
*/

function PartnerTile({ partnerData, onDeletePartner }) {

  // makes a post request to the backend
  // sending the partner to be deleted from the database
  const deletePartner = async (partner) => {
    try {
      const response = await fetch("http://localhost:4000/del-partner", { // Update the URL here
          method: "POST",
          headers: {
              "Content-type": "application/json"
          },
          body: JSON.stringify(partnerData)
      });
      if (!response.ok) {
          throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);

      // function from Dashboard which will delete this partner
      onDeletePartner(partnerData.name);
  } catch (error) {
      console.error("Error:", error);
  }
  }

  return (
    <div className="partner-tile">
      <img className="partner-thumbnail" src={partnerData.thumbnailUrl} />
      <hr />
      <div className="partner-info">
        <h3> {partnerData.name}</h3>
        {partnerData.isActive ? (
        <p style={{ color: 'green' }}>Active</p>
      ) : (
        <p style={{ color: 'red' }}>Not Active</p>
      )}
        <p>{partnerData.description}</p>
      </div>
      <button 
        className="delete-button" 
        onClick= {() => 
          deletePartner(partnerData)
        }
        >
          x
      </button>
    </div>
  );
}

export default PartnerTile;