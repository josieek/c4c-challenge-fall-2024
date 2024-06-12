import { useState, useEffect } from 'react';
import PartnerTile from './PartnerTile';
import AddPartner from './AddPartner';

/*
  The top-level component containing everything relevant to the dashboard,
  including information on each partner
*/
function Dashboard() {

  const [partners, setPartners] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showActive, setShowActive] = useState(true); 
  const [showInactive, setShowInactive] = useState(true); 

  const handleActiveCheckboxChange = (e) => {
    setShowActive(e.target.checked);
  };

  const handleInactiveCheckboxChange = (e) => {
    setShowInactive(e.target.checked);
  };

  const addNewPartner = (newPartner) => {
    setPartners((prevPartners) => ({
      ...prevPartners,
      [newPartner.name]: newPartner
    }));
  };

  const deletePartner = async (partnerName) => {
    setPartners((prevPartners) => {
      const updatedPartners = { ...prevPartners };
      delete updatedPartners[partnerName];
      return updatedPartners;
    });
  };

  // Filter partners based on the search query
  const filteredPartners = Object.keys(partners).filter((partnerKey) =>
    partners[partnerKey].name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter partners based on activity
  const filteredActive = Object.keys(partners).filter((partnerKey) =>
    partners[partnerKey].isActive
  );

  const filterInactive= Object.keys(partners).filter((partnerKey) =>
    !partners[partnerKey].isActive
  );

  // Function to handle search input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Load all partners on initial page load 
  useEffect(() => {
    fetch('http://localhost:4000', {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => {
      // Set partners state with fetched data
      setPartners(data);
    })
    .catch((error) => {
      console.error('Error fetching partners:', error);
    });
  }, [])

  return (
    <div id="main-content">
      {/* Pass the addNewPartner function to the AddPartner component */}
      <AddPartner onAddPartner={addNewPartner} />
      <div id="search-bar" className="search-bar">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div id="filter-checkboxes">
        <label style={{ color: 'green' }}>
          <input
            type="checkbox"
            checked={showActive}
            onChange={handleActiveCheckboxChange}
          />
          Active
        </label>
        <label style={{ color: 'red' }}>
          <input
            type="checkbox"
            checked={showInactive}
            onChange={handleInactiveCheckboxChange}
          />
          Inactive
        </label>
      </div>
      <div id="main-partners-grid" className="partners-grid">
        {/* Loop through filtered partners and render PartnerTile component for each */}
        {filteredPartners.length > 0 ? (
          filteredPartners.map((partnerKey) => {
            const partnerData = partners[partnerKey];
            // Check if the partner is active and matches the search query
            const isActive = partnerData.isActive;
            const matchesSearchQuery = partnerData.name.toLowerCase().includes(searchQuery.toLowerCase());
            // Render the PartnerTile only if it matches the search query and the activity filter
            if (matchesSearchQuery && ((isActive && showActive) || (!isActive && showInactive))) {
              return (
                <PartnerTile 
                  key={partnerKey} 
                  partnerData={partnerData} 
                  onDeletePartner={deletePartner}
                />
              );
            }
      return null; // If the partner doesn't match the criteria, return null
    })
  ) : (
    <p>No partners match your search.</p>
  )}
      </div>
    </div>
  )
}

export default Dashboard;