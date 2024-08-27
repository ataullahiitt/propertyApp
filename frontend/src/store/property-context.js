import React, { useState } from 'react';

const PropertyContext = React.createContext({

    properties: [],
    getProperties: () => { },
    addNewProperty: () => { },
    getProperty: () => { },
    onDelete: () => { },
    onUpdate: () => { }
});

export const PropertyContextProvider = (props) => {

    const [properties, setProperties] = useState([]);

    const getProperties = (data) => {
        setProperties(data);
    }

    const addNewPropertyHandler = (data) => {

        setProperties([...properties, data])
    }

    const getPropertyHandler = (propertyId) => {

        return properties.find((property) => property.uuid === propertyId);
    }
    const deletePropertyHandler = (propertyId) => {
        const updatedProperties = properties.filter((property) => property.uuid !== propertyId);
        setProperties(updatedProperties);
    }
    const updatePropertyHandler = (propertyId, updatedProperty) => {
        const updatedProperties = properties.map((property) => property.uuid === propertyId ? { ...property, ...updatedProperty } : property);
        setProperties(updatedProperties);
    }
    const contextValue = {
        properties: properties,
        getProperties: getProperties,
        addNewProperty: addNewPropertyHandler,
        getProperty: getPropertyHandler,
        onDelete: deletePropertyHandler,
        onUpdate: updatePropertyHandler
    }
    return <PropertyContext.Provider value={contextValue}>{props.children}</PropertyContext.Provider>
}
export default PropertyContext;