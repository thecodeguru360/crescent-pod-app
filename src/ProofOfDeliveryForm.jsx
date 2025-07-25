import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AutocompleteInput from "./AutoCompleteInput";
import { Link } from "react-router-dom";
import ActionBar from "./ActionBar";
import { useNavigate } from "react-router-dom";

const clientsData = [
  { id: 1, client_name: "ABC Company" },
  { id: 2, client_name: "XYZ Corporation" },
  { id: 3, client_name: "Ahmed Trading Co" },
  { id: 4, client_name: "Smith & Associates" },
  { id: 5, client_name: "Wilson Enterprises" },
];

const ProofOfDeliveryForm = ({ onSubmit: onFormSubmit }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [client_id, setClientId] = useState();
  const [clients, setClients] = useState(clientsData);

  useEffect(() => {
    if (window.api) {
      // if (window.api.addNote())
      //     window.api.addNote().then(() => "Note added")
      if (window.api.getClients()) {
        window.api.getClients().then((data) => {
          console.log(data);
          setClients(data);
        });
      } else console.error("window.api.getClients not defined");
    } else {
      console.error("window.api or window.api.getClients is undefined");
    }
  }, []);

  const onSubmit = (data) => {
    console.log(client_id);
    if (!client_id) {
      if (window.api) {
        window.api.addClient(data.consigneeName).then((response) => {
          console.log(response);
          saveFormData({ ...data, client_id: response.id });
        });
      }
    } else {
      saveFormData({ ...data, client_id });
    }
    if (onFormSubmit) {
      // onFormSubmit(data);
    }
  };

  const saveFormData = (data) => {
    console.log(data);
    if (window.api) {
      window.api.addForm(data).then((response) => {
        console.log(response);
        if (response && response.id) {
          navigate("/view-form/" + response.id);
        }
      });
    }
  };

  const handlePrintPreview = () => {
    window.print();
  };

  return (
    <div className="proof-of-delivery-container">
      <ActionBar>
        <Link className="action" to="/" title="Back to Control Panel">
          <div>
            <img
              src={process.env.PUBLIC_URL + "/house.png"}
              alt="crescent logo"
            />
          </div>
        </Link>
        <button
          className="action"
          type="button"
          onClick={handleSubmit(onSubmit)}
          title="Save Data"
        >
          <div>
            <img src={process.env.PUBLIC_URL + "/save.png"} alt="save record" />
          </div>
        </button>
      </ActionBar>
      <div>
        <div className="form-header">
          <h1 className="form-title">PROOF OF DELIVERY</h1>
          <p className="form-subtitle">ڈیلیوری کا ثبوت</p>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <div className="label-container">
              <span className="label-en">Dated:</span>
              <span className="label-ur">تاریخ:</span>
            </div>
            <input
              className="form-input"
              {...register("dated")}
              value={new Date().toISOString().substring(0, 10)}
              type="date"
            />
          </div>

          {/* <div className="form-group">
            <div className="label-container">
              <span className="label-en">Name of Consignee:</span>
              <span className="label-ur">مال وصول کنندہ کا نام:</span>
            </div>
            <input
              className="form-input"
              {...register("consigneeName")}
              type="text"
            />
          </div> */}
          <div className="form-group">
            <div className="label-container">
              <span className="label-en">Name of Consignee:</span>
              <span className="label-ur">مال وصول کنندہ کا نام:</span>
            </div>
            <AutocompleteInput
              name="consigneeName"
              control={control} // from useForm()
              suggestions={clients}
              className="form-input"
              onSelect={setClientId}
              placeholder="Start typing client name..."
            />
          </div>

          <div className="form-group">
            <div className="label-container">
              <span className="label-en">B/L or AWB No:</span>
              <span className="label-ur">بی/ایل یا اے ڈبلیو بی نمبر:</span>
            </div>
            <input
              className="form-input"
              {...register("blAwbNo")}
              type="text"
            />
          </div>

          <div className="form-group">
            <div className="label-container">
              <span className="label-en">Description of Goods:</span>
              <span className="label-ur">اشیاء کی تفصیلات:</span>
            </div>
            <input
              className="form-input"
              {...register("goodsDescription")}
              type="text"
            />
          </div>

          <div className="form-group">
            <div className="label-container">
              <span className="label-en">Total Packages:</span>
              <span className="label-ur">کل پیکج کی تعداد:</span>
            </div>
            <input
              className="form-input"
              {...register("totalPackages")}
              type="text"
            />
          </div>

          <div className="form-group">
            <div className="label-container">
              <span className="label-en">Total Gross Weight:</span>
              <span className="label-ur">کل مجموعی وزن:</span>
            </div>
            <input
              className="form-input"
              {...register("totalGrossWeight")}
              type="text"
            />
          </div>

          <div className="form-group">
            <div className="label-container">
              <span className="label-en">Total Net Weight:</span>
              <span className="label-ur">کل خالص وزن:</span>
            </div>
            <input
              className="form-input"
              {...register("totalNetWeight")}
              type="text"
            />
          </div>

          <div className="form-group">
            <div className="label-container">
              <span className="label-en">Vessel:</span>
              <span className="label-ur">جہاز کا نام:</span>
            </div>
            <input className="form-input" {...register("vessel")} type="text" />
          </div>

          <div className="form-group">
            <div className="label-container">
              <span className="label-en">Igm/VIR No:</span>
              <span className="label-ur">آئی جی ایم / وی آئی آر نمبر:</span>
            </div>
            <input
              className="form-input"
              {...register("igmVirNo")}
              type="text"
            />
          </div>

          <div className="form-group">
            <div className="label-container">
              <span className="label-en">No. of Packages:</span>
              <span className="label-ur">پیکج کی تعداد:</span>
            </div>
            <input
              className="form-input"
              {...register("noOfPackages")}
              type="text"
            />
          </div>

          <div className="form-group">
            <div className="label-container">
              <span className="label-en">Container No:</span>
              <span className="label-ur">کنٹینر نمبر:</span>
            </div>
            <input
              className="form-input"
              {...register("containerNo")}
              type="text"
            />
          </div>

          <div className="form-group">
            <div className="label-container">
              <span className="label-en">Machine No & Date:</span>
              <span className="label-ur">بکنگ نمبر اور تاریخ:</span>
            </div>
            <input
              className="form-input"
              {...register("machineNoDate")}
              type="text"
            />
          </div>

          <div className="form-group">
            <div className="label-container">
              <span className="label-en">Vehicle No/Type:</span>
              <span className="label-ur">گاڑی نمبر/قسم:</span>
            </div>
            <input
              className="form-input"
              {...register("vehicleNoType")}
              type="text"
            />
          </div>

          <div className="form-group">
            <div className="label-container">
              <span className="label-en">Driver Name:</span>
              <span className="label-ur">ڈرائیور کا نام:</span>
            </div>
            <input
              className="form-input"
              {...register("driverName")}
              type="text"
            />
          </div>

          <div className="form-group">
            <div className="label-container">
              <span className="label-en">Driver Tel:</span>
              <span className="label-ur">ڈرائیور ٹیل:</span>
            </div>
            <input
              className="form-input"
              {...register("driverTel")}
              type="text"
            />
          </div>

          <div className="form-group">
            <div className="label-container">
              <span className="label-en">Delivery Person:</span>
              <span className="label-ur">ڈیلیوری پرسن:</span>
            </div>
            <input
              className="form-input"
              {...register("deliveryPerson")}
              type="text"
            />
          </div>

          <div className="form-group">
            <div className="label-container">
              <span className="label-en">Phone No:</span>
              <span className="label-ur">فون نمبر:</span>
            </div>
            <input
              className="form-input"
              {...register("phoneNo")}
              type="text"
            />
          </div>

          <div className="form-group full-width">
            <div className="label-container">
              <span className="label-en">Pickup Address:</span>
              <span className="label-ur">پک اپ ایڈریس:</span>
            </div>
            <textarea
              className="form-input textarea-input"
              {...register("pickupAddress")}
            />
          </div>

          <div className="form-group full-width">
            <div className="label-container">
              <span className="label-en">Delivery Address:</span>
              <span className="label-ur">ڈیلیوری ایڈریس:</span>
            </div>
            <textarea
              className="form-input textarea-input"
              {...register("deliveryAddress")}
            />
          </div>

          <div className="form-group full-width">
            <div className="label-container">
              <span className="label-en">Contact Person/Cell No:</span>
              <span className="label-ur">رابطہ کار/سیل نمبر:</span>
            </div>
            <input
              className="form-input"
              {...register("contactPersonCell")}
              type="text"
            />
          </div>
        </div>

        <div className="signature-section">
          <div className="signature-header">
            <div className="signature-header-cell">
              <div>Arrival Date/Time</div>
              <div>آمد کی تاریخ/وقت</div>
            </div>
            <div className="signature-header-cell">
              <div>Gate-In Date/Time</div>
              <div>گیٹ ان کی تاریخ/وقت</div>
            </div>
            <div className="signature-header-cell">
              <div>Gate-Out Date/Time</div>
              <div>گیٹ آؤٹ کی تاریخ/وقت</div>
            </div>
          </div>
          <div className="signature-row">
            <div className="signature-cell"></div>
            <div className="signature-cell"></div>
            <div className="signature-cell"></div>
          </div>
        </div>

        <div className="receiver-section">
          <div className="receiver-header">
            <div className="receiver-header-cell">
              <div>Receiver's Name</div>
              <div>وصول کنندہ کا نام</div>
            </div>
            <div className="receiver-header-cell">
              <div>Receiving Date</div>
              <div>وصولی کی تاریخ</div>
            </div>
            <div className="receiver-header-cell">
              <div>Receiver's Signature</div>
              <div>وصول کنندہ کے دستخط</div>
            </div>
          </div>
          <div className="receiver-row">
            <div className="receiver-cell"></div>
            <div className="receiver-cell"></div>
            <div className="receiver-cell"></div>
          </div>
        </div>
        <div className="form-group full-width">
          <div className="label-container">
            <span className="label-en">Remarks:</span>
            <span className="label-ur">ملاحظات:</span>
          </div>
          <textarea
            className="form-input textarea-input"
            {...register("remarks")}
          />
        </div>

        <div className="button-container">
          <ActionBar>
            <button
              className="action"
              type="button"
              onClick={handleSubmit(onSubmit)}
              title="Save Data"
            >
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/save.png"}
                  alt="save record"
                />
              </div>
            </button>
          </ActionBar>
        </div>
      </div>
    </div>
  );
};

export default ProofOfDeliveryForm;
