const pool = require('../../db/db');
const { validateEnquiry } = require('../validators/enquiryValidator');

const createEnquiry = async (req, res) => {
  try {
    const validation = validateEnquiry(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
    }

    const { fullName, email, phone, companyName, service, message } = validation.sanitized;

    const query = `
      INSERT INTO enquiries (full_name, email, phone, company_name, service, message)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, full_name AS "fullName", email, phone, company_name AS "companyName", service, message, created_at AS "createdAt"
    `;

    const result = await pool.query(query, [
      fullName,
      email,
      phone,
      companyName,
      service,
      message
    ]);

    const createdEnquiry = result.rows[0];

    return res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      enquiry: createdEnquiry
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const getEnquiries = async (req, res) => {
  try {
    const query = `
      SELECT 
        id,
        full_name AS "fullName",
        email,
        phone,
        company_name AS "companyName",
        service,
        message,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM enquiries
      ORDER BY created_at DESC
    `;

    const result = await pool.query(query);

    return res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const getEnquiryById = async (req, res) => {
  try {
    const rawId = req.params.id;
    const id = parseInt(rawId, 10);

    if (isNaN(id) || id <= 0 || String(id) !== rawId.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid enquiry ID'
      });
    }

    const query = `
      SELECT 
        id,
        full_name AS "fullName",
        email,
        phone,
        company_name AS "companyName",
        service,
        message,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM enquiries
      WHERE id = $1
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const updateEnquiry = async (req, res) => {
  try {
    const rawId = req.params.id;
    const id = parseInt(rawId, 10);

    if (isNaN(id) || id <= 0 || String(id) !== rawId.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid enquiry ID'
      });
    }

    const validation = validateEnquiry(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
    }

    const { fullName, email, phone, companyName, service, message } = validation.sanitized;

    const query = `
      UPDATE enquiries
      SET full_name = $1,
          email = $2,
          phone = $3,
          company_name = $4,
          service = $5,
          message = $6,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $7
      RETURNING 
        id,
        full_name AS "fullName",
        email,
        phone,
        company_name AS "companyName",
        service,
        message,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
    `;

    const result = await pool.query(query, [
      fullName,
      email,
      phone,
      companyName,
      service,
      message,
      id
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const deleteEnquiry = async (req, res) => {
  try {
    const rawId = req.params.id;
    const id = parseInt(rawId, 10);

    if (isNaN(id) || id <= 0 || String(id) !== rawId.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid enquiry ID'
      });
    }

    const query = 'DELETE FROM enquiries WHERE id = $1 RETURNING id';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry
};
