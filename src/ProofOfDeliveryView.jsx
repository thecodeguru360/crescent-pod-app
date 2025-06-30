import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import ActionBar from "./ActionBar";
import { Link } from "react-router-dom";
import "./ProofOfDeliveryView.css";

const ProofOfDeliveryView = ({ data = {} }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState(data);
  const printRef = useRef();
  useEffect(() => {
    console.log(id);
    if (window.api) {
      // the Form data
      window.api.getFormById(id).then((response) => {
        console.log(response);
        if (response.id) {
          setFormData(response);
        }
      });
    }
  }, []);

  useEffect(() => {
    console.log(printRef.current);
  }, [printRef]);

  const handlePrintPreview = useReactToPrint({ contentRef: printRef });

  return (
    <div>
      <div className="action-bar-container">
        <ActionBar>
          <Link className="action" to="/" title="Back to Control Panel">
            <div>
              <img
                src={process.env.PUBLIC_URL + "/house.png"}
                alt="Home logo"
              />
            </div>
          </Link>
          <Link className="action" to="/add-form" title="Add New POD">
            <div>
              <img
                src={process.env.PUBLIC_URL + "/add-file.png"}
                alt="add file logo"
              />
            </div>
          </Link>
          <button
            className="action"
            style={{ marginLeft: "auto" }}
            type="button"
            onClick={handlePrintPreview}
            title="Print"
          >
            <div>
              <img
                src={process.env.PUBLIC_URL + "/printer.png"}
                alt="save record"
              />
            </div>
          </button>
        </ActionBar>
      </div>
      <div className="proof-of-delivery-view-container" ref={printRef}>
        <div className="top-header">
          <div>
            <img
              src={process.env.PUBLIC_URL + "/crescent-logo.png"}
              alt="crescent logo"
            />
          </div>
          <div className="view-header">
            <h1 className="view-title">PROOF OF DELIVERY</h1>{" "}
            <p className="view-subtitle">ڈیلیوری کا ثبوت</p>{" "}
            <div className="">
              <b>POD #: {formData.id || ""}</b>
            </div>
          </div>
          <div>
            <ul className="contact-details">
              <li>(021)35157591-94 (KHI)</li>
              <li>(021) 32312731 (KHI)</li>
              <li>(042) 36305305 (LHR)</li>
              <li>(040)4462402 (SAHIWAL)</li>
              <li>(051) 5464062 (ISL)</li>
              <li>crescentservices1@gmail.com</li>
              <li>www.crescentservices.com.pk</li>
              <li>
                House No. A-1, G-22, Park Lane, Kehkashan Block – 5, Clifton,
                Karachi
              </li>
            </ul>
          </div>
        </div>
        <div className="view-sub-header"></div>

        <div className="view-grid">
          {" "}
          {/* Updated class name */}
          {/* <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">POD #:</span>
              <span className="view-label-ur">پی او ڈی آئی ڈی:</span>
            </div>
            <div className="view-value">{formData.id || ""}</div>
          </div> */}
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Dated:</span>
              <span className="view-label-ur">تاریخ:</span>
            </div>
            <div className="view-value">{formData.dated || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Name of Consignee:</span>
              <span className="view-label-ur">مال وصول کنندہ کا نام:</span>
            </div>
            <div className="view-value">{formData.consigneeName || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">B/L or AWB No:</span>
              <span className="view-label-ur">بی/ایل یا اے ڈبلیو بی نمبر:</span>
            </div>
            <div className="view-value">{formData.blAwbNo || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Description of Goods:</span>
              <span className="view-label-ur">اشیاء کی تفصیلات:</span>
            </div>
            <div className="view-value">{formData.goodsDescription || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Total Packages:</span>
              <span className="view-label-ur">کل پیکج کی تعداد:</span>
            </div>
            <div className="view-value">{formData.totalPackages || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Total Gross Weight:</span>
              <span className="view-label-ur">کل مجموعی وزن:</span>
            </div>
            <div className="view-value">{formData.totalGrossWeight || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Total Net Weight:</span>
              <span className="view-label-ur">کل خالص وزن:</span>
            </div>
            <div className="view-value">{formData.totalNetWeight || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Vessel:</span>
              <span className="view-label-ur">جہاز کا نام:</span>
            </div>
            <div className="view-value">{formData.vessel || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">igm/VIR No:</span>
              <span className="view-label-ur">
                آئی جی ایم / وی آئی آر نمبر:
              </span>
            </div>
            <div className="view-value">{formData.igmVirNo || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">No. of Packages:</span>
              <span className="view-label-ur">پیکج کی تعداد:</span>
            </div>
            <div className="view-value">{formData.noOfPackages || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Container No:</span>
              <span className="view-label-ur">کنٹینر نمبر:</span>
            </div>
            <div className="view-value">{formData.containerNo || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Booking No & Date:</span>
              <span className="view-label-ur">بکنگ نمبر اور تاریخ:</span>
            </div>
            <div className="view-value">{formData.bookingNoDate || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Vehicle No/Type:</span>
              <span className="view-label-ur">گاڑی نمبر/قسم:</span>
            </div>
            <div className="view-value">{formData.vehicleNoType || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Driver Name:</span>
              <span className="view-label-ur">ڈرائیور کا نام:</span>
            </div>
            <div className="view-value">{formData.driverName || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Driver Tel:</span>
              <span className="view-label-ur">ڈرائیور ٹیل:</span>
            </div>
            <div className="view-value">{formData.driverTel || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Delivery Person:</span>
              <span className="view-label-ur">ڈیلیوری پرسن:</span>
            </div>
            <div className="view-value">{formData.deliveryPerson || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Phone No:</span>
              <span className="view-label-ur">فون نمبر:</span>
            </div>
            <div className="view-value">{formData.phoneNo || ""}</div>
          </div>
          <div className="view-group full-width">
            <div className="view-label-container">
              <span className="view-label-en">Pickup Address:</span>
              <span className="view-label-ur">پک اپ ایڈریس:</span>
            </div>
            {formData.pickupAddress && (
              <div className="textarea-view-value">
                {" "}
                {/* Updated class name */}
                {formData.pickupAddress || ""}
              </div>
            )}
            {!formData.pickupAddress && (
              <div className="view-lines-container">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
            )}
          </div>
          <div className="view-group full-width">
            <div className="view-label-container">
              <span className="view-label-en">Delivery Address:</span>
              <span className="view-label-ur">ڈیلیوری ایڈریس:</span>
            </div>
            {formData.deliveryAddress && (
              <div className="textarea-view-value">
                {" "}
                {/* Updated class name */}
                {formData.deliveryAddress || ""}
              </div>
            )}
            {!formData.deliveryAddress && (
              <div className="view-lines-container">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
            )}
          </div>
          <div className="view-group full-width">
            <div className="view-label-container">
              <span className="view-label-en">Contact Person/Cell No:</span>
              <span className="view-label-ur">رابطہ کار/سیل نمبر:</span>
            </div>
            <div className="view-value">{formData.contactPersonCell || ""}</div>
          </div>
        </div>

        <div className="view-table-section">
          {" "}
          {/* Updated class name */}
          <div className="view-table-header">
            {" "}
            {/* Updated class name */}
            <div className="view-table-header-cell">
              {" "}
              {/* Updated class name */}
              <div>Arrival Date/Time</div>
              <div>آمد کی تاریخ/وقت</div>
            </div>
            <div className="view-table-header-cell">
              <div>Gate-In Date/Time</div>
              <div>گیٹ ان کی تاریخ/وقت</div>
            </div>
            <div className="view-table-header-cell">
              <div>Gate-Out Date/Time</div>
              <div>گیٹ آؤٹ کی تاریخ/وقت</div>
            </div>
          </div>
          <div className="view-table-row">
            {" "}
            {/* Updated class name */}
            <div className="view-table-cell">
              {" "}
              {/* Updated class name */}
              <div className="view-table-value">
                {" "}
                {/* Updated class name */}
                {formData.arrivalDateTime || ""}
              </div>
            </div>
            <div className="view-table-cell">
              <div className="view-table-value">
                {formData.gateInDateTime || ""}
              </div>
            </div>
            <div className="view-table-cell">
              <div className="view-table-value">
                {formData.gateOutDateTime || ""}
              </div>
            </div>
          </div>
        </div>

        <div className="view-table-section">
          {" "}
          {/* Reusing view-table-section for receiver */}
          <div className="view-table-header">
            {" "}
            {/* Reusing view-table-header */}
            <div className="view-table-header-cell">
              <div>Receiver's Name</div>
              <div>وصول کنندہ کا نام</div>
            </div>
            <div className="view-table-header-cell">
              <div>Receiving Date</div>
              <div>وصولی کی تاریخ</div>
            </div>
            <div className="view-table-header-cell">
              <div>Receiver's Signature</div>
              <div>وصول کنندہ کے دستخط</div>
            </div>
          </div>
          <div className="view-table-row">
            {" "}
            {/* Reusing view-table-row */}
            <div className="view-table-cell">
              <div className="view-table-value">
                {formData.receiverName || ""}
              </div>
            </div>
            <div className="view-table-cell">
              <div className="view-table-value">
                {formData.receivingDate || ""}
              </div>
            </div>
            <div className="view-table-cell">
              <div className="view-table-value">
                {formData.receiverSignature || ""}
              </div>
            </div>
          </div>
        </div>

        <div className="remarks-view-section">
          {" "}
          {/* Updated class name */}
          <div className="remarks-view-label">
            {" "}
            {/* Updated class name */}
            <span>Remarks:</span>
            <span style={{ direction: "rtl" }}>ملاحظات:</span>
          </div>
          {formData.remarks && (
            <div className="textarea-view-value">
              {" "}
              {/* Updated class name */}
              {formData.remarks || ""}
            </div>
          )}
          {!formData.remarks && (
            <div className="view-lines-container">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          )}
          {/* Updated class name */}
        </div>
      </div>
    </div>
  );
};

export default ProofOfDeliveryView;
