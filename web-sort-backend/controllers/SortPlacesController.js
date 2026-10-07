import SortPlacesModel from "../model/SortPlaces.js";
import axios from "axios";

const getAddressFromCoordinates = async (lat, lon) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
  try {
    const response = await axios.get(url);
    return response.data.address;
  } catch (error) {
    console.error("Error fetching address from coordinates: ", error);
    return null;
  }
};

const getAllPlaces = async(req, res) => {
    try {
      const sortPlaces = await SortPlacesModel.find().exec();
      res.json(sortPlaces);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Не вдалося знайти пункти переробки сировини"
      });
    }
};

const getCategoryPlaces = async(req, res) => {
    const category = req.params.category;
    try {
      const sortPlaces = await SortPlacesModel.find({ sortCategories: category }).exec();
      if (!sortPlaces) {
        return res.status(404).json({
            message: "Жодних пунктів переробки сировини не знайдено!",
        });
    }
      res.json(sortPlaces);
    } catch (error) {
        console.log(err);
        res.status(500).json({
          message: "Не вдалося знайти пункти переробки сировини"
        });
    }
};

const upgradePlaces = async(req, res) => {
  try {
    for(const place of req.body) {
        const existingPlace = await SortPlacesModel.findOne({ id: place.id });
        const address = await getAddressFromCoordinates(place.lat, place.lon);
        const formattedPlace = {
            id: place.id,
            name: (place.tags.recycling_type === "container") ? `Контейнер для переробки сміття` : `Центр переробки сміття`,
            sortCategories: Object.keys(place.tags).filter(key => key.startsWith('recycling:')).map(key => key.replace('recycling:', '')),
            address: address ? `${address.road || ''}, ${address.city || address.town || address.village || ''}` : 'Не визначено',
            phoneHumber: place.tags.phone,
            description: place.tags.description, 
            workingHours: place.tags.opening_hours,
            cordinates: [ place.lat, place.lon ] 
        }
        if(existingPlace) {
            existingPlace.sortCategories = formattedPlace.sortCategories || existingPlace.sortCategories;
            existingPlace.address = formattedPlace.address || existingPlace.address;
            existingPlace.phoneHumber = formattedPlace.phoneHumber || existingPlace.phoneHumber;
            existingPlace.description = formattedPlace.description || existingPlace.description;
            existingPlace.workingHours = formattedPlace.workingHours || existingPlace.workingHours;
            existingPlace.cordinates = formattedPlace.cordinates || existingPlace.cordinates;
            await existingPlace.save();
        } else {
            const newPlace = new SortPlacesModel(formattedPlace);
            await newPlace.save();
        }
    }
    res.status(200).send({ message: 'Дані успішно збережені або оновлені.' });
} catch (err) {
    console.log(err);
    res.status(500).json({
        message: "Не вдалося оновити пункти переробки сировини"
    });
  }
};

export { getAllPlaces, getCategoryPlaces, upgradePlaces}


/**
 * SortPlacesModel
 * 
 * 
 * const upgradePlaces = async(req, res) => {
    const newSortPlaces = req.body;
    try {
        await SortPlacesModel.create(newSortPlaces);
        res.json({
            success: true,
        });
    } catch (error) {
        console.log(err);
        res.status(500).json({
          message: "Не вдалося оновити пункти переробки сировини"
        });
    }
};


const upgradePlaces = async(req, res) => {
    try {
        for(const place of req.body) {
          const existingPlace = await place.findOne({ name: place.name });
          if(existingPlace) {
            existingPlace.sortCategories = formattedPlace.sortCategories || existingPlace.sortCategories;
            existingPlace.address = formattedPlace.address || existingPlace.address;
            existingPlace.phoneHumber = formattedPlace.phoneHumber || existingPlace.phoneHumber;
            existingPlace.description = formattedPlace.description || existingPlace.description;
            existingPlace.workingHours = formattedPlace.workingHours || existingPlace.workingHours;
            existingPlace.cordinates = formattedPlace.cordinates || existingPlace.cordinates;
          } else {
            const markers = new SortPlacesModel({
              name: (place.tags.recycling_type === "container") ? `Контейнер для переробки сміття ${place.tags.name}` : `Центр переробки сміття ${place.name}`,
              sortCategories: Object.keys(place.tags).filter(key => key.startsWith('recycling:')).map(key => key.replace('recycling:', '')),
              address: place.tags.address,
              phoneHumber: place.tags.phone,
              description: place.tags.description, 
              workingHours: place.tags.opening_hours,
              cordinates: [ place.lat, place.lon ]  
            })
            const marker = await markers.save();
          }
        }
        res.status(200).send({ message: 'Дані успішно збережені або оновлені.' });
    } catch (error) {
        console.log(err);
        res.status(500).json({
          message: "Не вдалося оновити пункти переробки сировини"
        });
    }
};



const upgradePlaces = async(req, res) => {
    try {
        for(const place of req.body) {
          const formattedPlace = {
            name: (place.tags.recycling_type === "container") ? `Контейнер для переробки сміття ${place.tags?.name}` : `Центр переробки сміття ${place.tags?.name}`,
            sortCategories: Object.keys(place.tags).filter(key => key.startsWith('recycling:')).map(key => key.replace('recycling:', '')),
            address: place.tags.address,
            phoneHumber: place.tags.phone,
            description: place.tags.description, 
            workingHours: place.tags.opening_hours,
            cordinates: [ place.lat, place.lon ] 
          }

          const existingPlace = await SortPlacesModel.findOne({ name: formattedPlace.name });

          if(existingPlace) {
            existingPlace.sortCategories = formattedPlace.sortCategories || existingPlace.sortCategories;
            existingPlace.address = formattedPlace.address || existingPlace.address;
            existingPlace.phoneHumber = formattedPlace.phoneHumber || existingPlace.phoneHumber;
            existingPlace.description = formattedPlace.description || existingPlace.description;
            existingPlace.workingHours = formattedPlace.workingHours || existingPlace.workingHours;
            existingPlace.cordinates = formattedPlace.cordinates || existingPlace.cordinates;
          } else {
            const markers = new SortPlacesModel(formattedPlace);
            await markers.save();
          }
        }
        res.status(200).send({ message: 'Дані успішно збережені або оновлені.' });
    } catch (err) {
        console.log(err);
        res.status(500).json({
          message: "Не вдалося оновити пункти переробки сировини"
        });
    }
};

 * 
 */