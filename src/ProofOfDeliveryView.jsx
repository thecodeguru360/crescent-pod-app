import React from "react";
import "./ProofOfDeliveryView.css"; // Import the new CSS file

const ProofOfDeliveryView = ({ data = {} }) => {
  const handlePrintPreview = () => {
    window.print();
  };

  return (
    <div className="proof-of-delivery-view-container">
      {" "}
      {/* Updated class name */}
      <div>
        <div className="view-header">
          {" "}
          {/* Updated class name */}
          <h1 className="view-title">PROOF OF DELIVERY</h1>{" "}
          {/* Updated class name */}
          <p className="view-subtitle">ڈیلیوری کا ثبوت</p>{" "}
          {/* Updated class name */}
        </div>

        <div className="view-grid">
          {" "}
          {/* Updated class name */}
          <div className="view-group">
            {" "}
            {/* Updated class name */}
            <div className="view-label-container">
              {" "}
              {/* Updated class name */}
              <span className="view-label-en">Ryan Ref:</span>{" "}
              {/* Updated class name */}
              <span className="view-label-ur">ریان ریف:</span>{" "}
              {/* Updated class name */}
            </div>
            <div className="view-value">{data.ryanRef || ""}</div>{" "}
            {/* Updated class name */}
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Client Ref:</span>
              <span className="view-label-ur">کلائنٹ ریف:</span>
            </div>
            <div className="view-value">{data.clientRef || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Dated:</span>
              <span className="view-label-ur">تاریخ:</span>
            </div>
            <div className="view-value">{data.dated || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Name of Consignee:</span>
              <span className="view-label-ur">مال وصول کنندہ کا نام:</span>
            </div>
            <div className="view-value">{data.consigneeName || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">B/L or AWB No:</span>
              <span className="view-label-ur">بی/ایل یا اے ڈبلیو بی نمبر:</span>
            </div>
            <div className="view-value">{data.blAwbNo || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Description of Goods:</span>
              <span className="view-label-ur">اشیاء کی تفصیلات:</span>
            </div>
            <div className="view-value">{data.goodsDescription || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Total Packages:</span>
              <span className="view-label-ur">کل پیکج کی تعداد:</span>
            </div>
            <div className="view-value">{data.totalPackages || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Total Gross Weight:</span>
              <span className="view-label-ur">کل مجموعی وزن:</span>
            </div>
            <div className="view-value">{data.totalGrossWeight || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Total Net Weight:</span>
              <span className="view-label-ur">کل خالص وزن:</span>
            </div>
            <div className="view-value">{data.totalNetWeight || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Vessel:</span>
              <span className="view-label-ur">جہاز کا نام:</span>
            </div>
            <div className="view-value">{data.vessel || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Vgm/Vgm Ref:</span>
              <span className="view-label-ur">وی جی ایم/وی جی ایم ریف:</span>
            </div>
            <div className="view-value">{data.vgmRef || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">No. of Packages:</span>
              <span className="view-label-ur">پیکج کی تعداد:</span>
            </div>
            <div className="view-value">{data.noOfPackages || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Container No:</span>
              <span className="view-label-ur">کنٹینر نمبر:</span>
            </div>
            <div className="view-value">{data.containerNo || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Booking No & Date:</span>
              <span className="view-label-ur">بکنگ نمبر اور تاریخ:</span>
            </div>
            <div className="view-value">{data.bookingNoDate || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Vehicle No/Type:</span>
              <span className="view-label-ur">گاڑی نمبر/قسم:</span>
            </div>
            <div className="view-value">{data.vehicleNoType || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Driver Name:</span>
              <span className="view-label-ur">ڈرائیور کا نام:</span>
            </div>
            <div className="view-value">{data.driverName || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Driver Tel:</span>
              <span className="view-label-ur">ڈرائیور ٹیل:</span>
            </div>
            <div className="view-value">{data.driverTel || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Delivery Person:</span>
              <span className="view-label-ur">ڈیلیوری پرسن:</span>
            </div>
            <div className="view-value">{data.deliveryPerson || ""}</div>
          </div>
          <div className="view-group">
            <div className="view-label-container">
              <span className="view-label-en">Phone No:</span>
              <span className="view-label-ur">فون نمبر:</span>
            </div>
            <div className="view-value">{data.phoneNo || ""}</div>
          </div>
          <div className="view-group full-width">
            <div className="view-label-container">
              <span className="view-label-en">Pickup Address:</span>
              <span className="view-label-ur">پک اپ ایڈریس:</span>
            </div>
            <div className="textarea-view-value">
              {" "}
              {/* Updated class name */}
              {data.pickupAddress || ""}
            </div>
          </div>
          <div className="view-group full-width">
            <div className="view-label-container">
              <span className="view-label-en">Delivery Address:</span>
              <span className="view-label-ur">ڈیلیوری ایڈریس:</span>
            </div>
            <div className="textarea-view-value">
              {" "}
              {/* Updated class name */}
              {data.deliveryAddress || ""}
            </div>
          </div>
          <div className="view-group full-width">
            <div className="view-label-container">
              <span className="view-label-en">Contact Person/Cell No:</span>
              <span className="view-label-ur">رابطہ کار/سیل نمبر:</span>
            </div>
            <div className="view-value">{data.contactPersonCell || ""}</div>
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
                {data.arrivalDateTime || ""}
              </div>
            </div>
            <div className="view-table-cell">
              <div className="view-table-value">
                {data.gateInDateTime || ""}
              </div>
            </div>
            <div className="view-table-cell">
              <div className="view-table-value">
                {data.gateOutDateTime || ""}
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
              <div className="view-table-value">{data.receiverName || ""}</div>
            </div>
            <div className="view-table-cell">
              <div className="view-table-value">{data.receivingDate || ""}</div>
            </div>
            <div className="view-table-cell">
              <div className="view-table-value">
                {data.receiverSignature || ""}
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
          <div className="remarks-view-value">{data.remarks || ""}</div>{" "}
          {/* Updated class name */}
        </div>

        <div className="button-container">
          <button
            type="button"
            className="print-button"
            onClick={handlePrintPreview}
          >
            Print Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProofOfDeliveryView;
