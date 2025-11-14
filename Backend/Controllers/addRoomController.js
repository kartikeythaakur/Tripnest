import addRoomModel from "../Models/addRoomModel.js";
import addPropertyModel from "../Models/addPropertyModel.js";

export const addRoom = async (req, res) => {
  try {
    let { name, desc, capacity, price , propertyId } = req.body;
    if(!name || !desc || !capacity || !price) res.status(400).json({message:"Fill all required fields",success:false});

    capacity = Number(capacity);
    price = Number(price);

    //Find the proeprty first
    const property = await addPropertyModel.findById(propertyId);
    if(!property) return res.status(403).json({message:"Property not found",success:false});

    const imageUrls = req.files.map((file)=>file.path) || [];

    //Add new room
    const newRoom = await addRoomModel.create({
      name,
      description:desc,
      capacity,
      price,
      images:imageUrls
    });

    //Now add the room to the property
    await addPropertyModel.findByIdAndUpdate(propertyId,{
      $push:{rooms : newRoom._id},
    })

    return res.status(200).json({
      message: "Room added to property successfully",
      room: newRoom,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Server Error",error,success:false});
  }
};
