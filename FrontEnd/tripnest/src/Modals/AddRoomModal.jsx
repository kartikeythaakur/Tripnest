import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddRoomModal = ({
  show,
  handleClose,
  handleSubmit,
  room,
  handleChange,
  photoChange,
  disable,
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ textAlign: "center", color: "#1e3a8a" }}>
          Add New Room
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ padding: "30px" }}>
        <Form onSubmit={handleSubmit}>
          {/* Room Type Dropdown */}
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Room Type</Form.Label>
            <Form.Select
              name="name"
              value={room.name}
              onChange={handleChange}
              required
            >
              <option value="">Select room type</option>
              <option value="Deluxe Room">Deluxe Room</option>
              <option value="Suite">Suite</option>
              <option value="Executive Room">Executive Room</option>
              <option value="Family Room">Family Room</option>
              <option value="Standard Room">Standard Room</option>
              <option value="Luxury Room">Luxury Room</option>
            </Form.Select>
          </Form.Group>

          {/* Capacity (Persons per room) */}
          <Form.Group className="mb-3" controlId="capacity">
            <Form.Label>Capacity (Persons per room)</Form.Label>
            <Form.Control
              type="number"
              name="capacity"
              placeholder="e.g. 2"
              value={room.capacity}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Total Rooms */}
          <Form.Group className="mb-3" controlId="totalRooms">
            <Form.Label>Total Rooms</Form.Label>
            <Form.Control
              type="number"
              name="totalRooms"
              placeholder="e.g. 1"
              value={room.totalRooms || 1}
              onChange={handleChange}
              required
              min={1}
            />
          </Form.Group>

          {/* Price */}
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price (per night)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="Enter price"
              value={room.price}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3" controlId="desc">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="desc"
              placeholder="Write something about the room..."
              value={room.desc}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Photos */}
          <Form.Group className="mb-3" controlId="photos">
            <Form.Label>Upload Photos</Form.Label>
            <Form.Control
              type="file"
              name="photos"
              accept="image/*"
              onChange={photoChange}
              multiple
            />
            <Form.Text muted>Upload one or more room photos.</Form.Text>
          </Form.Group>

          {/* Submit Button */}
          <Button
            variant="primary"
            type="submit"
            disabled={disable}
            className="w-100"
          >
            {disable ? "Please wait..." : "Add Room"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddRoomModal;
