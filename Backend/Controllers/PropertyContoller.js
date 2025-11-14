import properties from "../Models/addPropertyModel.js";

export const getAllProperties = async (req, res) => {
  try {
    const allproperties = await properties.find().sort({createdAt: -1});
    if (allproperties.length == 0)
      return res
        .status(200)
        .json({ message: "No properties found", success: true });
    return res
      .status(200)
      .json({
        allproperties,
        success: true,
        message: `${allproperties.length} Properties found`,
        totalProperties: allproperties.length,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ message: "Failed to fetch properties", success: false, error });
  }
};
