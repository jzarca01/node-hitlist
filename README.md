# node-hitlist

An API for Hitlist

## Usage

```javascript
const Hitlist = require('node-hitlist');
const hit = new Hitlist();
```

### Get airports list

```javascript
hit.listAirports();
```

### Create session

```javascript
hit.createSession(iataCode);
/*
iataCode is optional, it can be found using listAirports() method
if no iataCode is provided, it will default to your IP geolocation
Prices and availability will depend on location provided
*/
```

### Get profile

```javascript
hit.getProfile();
```

### Get trips

```javascript
hit.getTrips();
```

### Get cities

```javascript
hit.getCities();
```

### Get featured list

```javascript
hit.getFeaturedList(listId);
```

### Get city details

```javascript
hit.getCity(citySlug);
/* 
for example paris-france 
*/
```

### Get deals by city

```javascript
hit.getDealsByCity(citySlug);
/* 
for example paris-france 
*/
```

### Get hotels by city

```javascript
hit.getHotelsByCity(citySlug);
/* 
for example paris-france 
*/
```
