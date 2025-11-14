import addPropertyModel from "../Models/addPropertyModel.js";

export const addProperty = async (req, res) => {
  try {
    console.log("Req at add property");
    const { name, desc, location, state, district } = req.body;
    if (!name || !desc || !location)
      return res
        .status(400)
        .json({ message: "Fill all the fields", success: false });

    console.log(req.files);
    const imageUrls = req.files.map((file) => file.path);

    const newProperty = await addPropertyModel.create({
      name,
      description: desc,
      location,
      state,
      district,
      images: imageUrls,
    });

    return res.status(201).json({
      message: "Property added successfully",
      success: true,
      newProperty,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server Error", success: false, error });
  }
};

export const getProperty = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ message: "Property id not provided", success: false });

    const property = await addPropertyModel.findById(id).populate("rooms");

    if (!property)
      return res
        .status(400)
        .json({ message: "Property not found", success: false });

    return res.status(200).json({
      message: "Property fetched successfully",
      success: true,
      property,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch property details , sever error",
      success: false,
      error: error.message,
    });
  }
};

export const getPropertyCount = async (req, res) => {
  try {
    const totalProperties = await addPropertyModel.countDocuments();
    if (totalProperties === 0)
      return res
        .status(404)
        .json({ message: "No properties found", success: false });
    return res.status(200).json({
      message: "Properties fetched successfully",
      success: true,
      totalProperties,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "No properties found",
      success: false,
      error: error.message,
    });
  }
};

export const getLocations = async (req, res) => {
  try {
    const locations = await addPropertyModel.find({}, "name _id");
    if (!locations)
      return res
        .status(400)
        .json({ message: "No locations found", success: false });

    return res
      .status(200)
      .json({ message: "location found", success: true, locations });
  } catch (error) {
    return res.status(400).json({ message: "Server error", success: false });
  }
};
