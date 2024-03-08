/* eslint-disable no-useless-escape */
import { useState } from "react";
import classes from "./FormInput.module.css";
import { useForm } from "react-hook-form";
import { SubmitHandler, FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "./Modal";

function FormInput() {
  const titleTH = ["นาย", "นาง", "นางสาว"];
  const titleEN = ["Mr.", "Mrs.", "Miss"];

  const [selectedTitleTH, setSelectedTitleTH] = useState(titleTH[0]);
  const [selectedTitleEN, setSelectedTitleEN] = useState(titleEN[0]);

  const [open, setOpen] = useState(false);

  const handleTitleTHChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTitleTH(e.target.value);
    setSelectedTitleEN(titleEN[titleTH.indexOf(e.target.value)]);
  };

  const handleTitleENChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTitleEN(e.target.value);
    setSelectedTitleTH(titleTH[titleEN.indexOf(e.target.value)]);
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const titleTHRegister = register("titleTH", { required: true });
  const titleENRegister = register("titleEN", { required: true });

  const titleTHValue = selectedTitleTH;
  const titleENValue = selectedTitleEN;

  function capitalNameEN(str: string) {
    if (typeof str !== "string" || str.length === 0) {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const nameTHValue = getValues("nameTH");
  const surnameTHValue = getValues("surnameTH");
  const nameENValue = capitalNameEN(getValues("nameEN"));
  const surnameENValue = capitalNameEN(getValues("surnameEN"));
  const telValue = getValues("tel");
  const emailValue = getValues("email");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    try {
      data.titleTH = selectedTitleTH;
      data.titleEN = selectedTitleEN;
      data.nameEN = capitalNameEN(data.nameEN);
      data.surnameEN = capitalNameEN(data.surnameEN);
      console.log(data);
      console.log(errors);
      toast.success("Form submitted successfully");
      setOpen(true);
    } catch (error) {
      toast.error("Failed to submit form");
    }
  };
  return (
    <div className={`${classes.bg} py-[100px] xl:py-[150px] lg:h-screen `}>
      <div className="bg-white lg:pt-[64px] lg:pb-[40px] pt-[50px] pb-[30px] px-[30px] rounded-[20px] shadow-lg w-fit mx-auto ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col lg:gap-12 gap-12"
        >
          {/* --------- name th --------- */}
          {/* name th menu */}
          <div className="flex flex-col lg:flex-row lg:gap-5 gap-8">
            <section className="mb-[-15px]">
              <p className="text-[18px] mb-2">คำนำหน้าชื่อ</p>
              <select
                {...titleTHRegister}
                value={selectedTitleTH}
                onChange={(e) => {
                  titleTHRegister.onChange(e);
                  handleTitleTHChange(e);
                }}
                className="h-[40px] text-[18px] pl-2 w-[96px] bg-[#f8f8f8] rounded-[5px] border border-gray-300"
              >
                {titleTH.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </section>

            {/* name th input */}
            <section className="flex flex-col relative">
              <p className="text-[18px] mb-2">
                ชื่อ<span className="text-red-600">*</span>
              </p>
              <input
                className="h-[40px] text-[18px] lg:w-[320px] w-full pl-3 bg-[#f8f8f8] rounded-[5px] border border-gray-300"
                type="text"
                placeholder="ชื่อ"
                {...register("nameTH", {
                  required: true,
                  pattern: /^[\u0E01-\u0E5B\s]+$/i,
                })}
              />
              {/* error */}
              {errors.nameTH && errors.nameTH.type === "required" && (
                <p className="absolute bottom-[-25px] text-red-600 ">
                  *required*
                </p>
              )}
              {errors.nameTH && errors.nameTH.type === "pattern" && (
                <p className="absolute bottom-[-25px] text-red-600">
                  *ชื่อต้องเป็นภาษาไทย*
                </p>
              )}
            </section>

            {/* surname th input */}
            <section className="flex flex-col relative">
              <p className="text-[18px] mb-2">
                นามสกุล<span className="text-red-600">*</span>
              </p>
              <input
                className="h-[40px] text-[18px] lg:w-[320px] w-full pl-3 bg-[#f8f8f8] rounded-[5px] border border-gray-300"
                type="text"
                placeholder="นามสกุล"
                {...register("surnameTH", {
                  required: true,
                  pattern: /^[\u0E01-\u0E5B\s]+$/i,
                })}
              />
              {errors.surnameTH && errors.surnameTH.type === "required" && (
                <p className="absolute bottom-[-25px] text-red-600">
                  *required*
                </p>
              )}
              {errors.surnameTH && errors.surnameTH.type === "pattern" && (
                <p className="absolute bottom-[-25px] text-red-600">
                  *นามสกุลต้องเป็นภาษาไทย*
                </p>
              )}
            </section>
          </div>

          {/* --------- name en --------- */}
          {/* name en menu */}
          <div className="flex flex-col lg:flex-row lg:gap-5 gap-8">
            <section className="mb-[-15px]">
              <p className="text-[18px] mb-2">Title</p>
              <select
                {...titleENRegister}
                value={selectedTitleEN}
                onChange={(e) => {
                  titleENRegister.onChange(e);
                  handleTitleENChange(e);
                }}
                className="h-[40px] text-[18px] pl-2 w-[96px] bg-[#f8f8f8] rounded-[5px] border border-gray-300"
              >
                {titleEN.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </section>

            {/* name en input */}
            <section className="flex flex-col relative">
              <p className="text-[18px] mb-2">
                First Name<span className="text-red-600">*</span>
              </p>
              <input
                className="h-[40px] text-[18px] lg:w-[320px] w-full pl-3 bg-[#f8f8f8] rounded-[5px] border border-gray-300"
                type="text"
                placeholder="First Name"
                {...register("nameEN", {
                  required: true,
                  pattern: /^[A-Za-z0-9\s\.,;'"!\?\-]+$/i,
                })}
              />
              {errors.nameEN && errors.nameEN.type === "required" && (
                <p className="absolute bottom-[-25px] text-red-600">
                  *required*
                </p>
              )}
              {errors.nameEN && errors.nameEN.type === "pattern" && (
                <p className="absolute bottom-[-25px] text-red-600">
                  *Name must be in English*
                </p>
              )}
            </section>

            {/* surname en input */}
            <section className="flex flex-col relative">
              <p className="text-[18px] mb-2">
                Last Name<span className="text-red-600">*</span>
              </p>
              <input
                className="h-[40px] text-[18px] lg:w-[320px] w-full pl-3 bg-[#f8f8f8] rounded-[5px] border border-gray-300"
                type="text"
                placeholder="Last Name"
                {...register("surnameEN", {
                  required: true,
                  pattern: /^[A-Za-z0-9\s\.,;'"!\?\-]+$/i,
                })}
              />
              {errors.surnameEN && errors.surnameEN.type === "required" && (
                <p className="absolute bottom-[-25px] text-red-600">
                  *required*
                </p>
              )}
              {errors.surnameEN && errors.surnameEN.type === "pattern" && (
                <p className="absolute bottom-[-25px] text-red-600">
                  *Name must be in English*
                </p>
              )}
            </section>
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-[40px] gap-8">
            {/* --------- tel --------- */}
            <section className="md:w-[500px] w-[250px] flex flex-col relative">
              <p className="text-[18px] mb-2">
                Tel.<span className="text-red-600">*</span>
              </p>
              <input
                className="h-[40px] text-[18px] w-full pl-3 bg-[#f8f8f8] rounded-[5px] border border-gray-300"
                type="tel"
                placeholder="Tel."
                {...register("tel", {
                  required: true,
                  maxLength: 10,
                  minLength: 10,
                  pattern: /^(09|08|06)[0-9]{8}$/i,
                })}
              />
              {errors.tel && errors.tel.type === "required" && (
                <p className="absolute bottom-[-25px] text-red-600">
                  *required*
                </p>
              )}
              {errors.tel && errors.tel.type === "pattern" && (
                <p className="lg:absolute lg:bottom-[-50px] text-red-600">
                  *Tel. must start with 09, 08, or 06 and contain only numbers*
                </p>
              )}
              {errors.tel && errors.tel.type === "maxLength" && (
                <p className="absolute bottom-[-25px] text-red-600">
                  *Tel. must be 10 digits long*
                </p>
              )}
              {errors.tel && errors.tel.type === "minLength" && (
                <p className="absolute bottom-[-25px] text-red-600">
                  *Tel. must be 10 digits long*
                </p>
              )}
            </section>

            {/* --------- email --------- */}
            <section className="md:w-full w-[250px] flex flex-col relative">
              <p className="text-[18px] mb-2">
                Email<span className="text-red-600">*</span>
              </p>
              <input
                className="h-[40px] text-[18px] w-full pl-3 bg-[#f8f8f8] rounded-[5px] border border-gray-300"
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                })}
              />
              {errors.email && errors.email.type === "required" && (
                <p className="absolute bottom-[-25px] text-red-600">
                  *required*
                </p>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <p className="absolute bottom-[-25px] text-red-600">
                  *Invalid email addresses*
                </p>
              )}
            </section>
          </div>

          {/* --------- submit --------- */}
          <input
            type="submit"
            className="h-[40px] text-[18px] text-white mt-4 w-fit px-[50px] bg-black rounded-[5px] hover:cursor-pointer hover:bg-gray-600 mx-auto"
          />
        </form>
      </div>

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          window.location.reload();
        }}
      >
        <div className="text-[20px] w-fit mx-auto mt-8 grid grid-cols-4 gap-y-3">
          <div className="font-bold">ชื่อ</div>
          <div className="col-span-3">
            {titleTHValue}
            {nameTHValue} {surnameTHValue}
          </div>

          <div className="font-bold">Name</div>
          <div className="col-span-3">
            {titleENValue} {nameENValue} {surnameENValue}
          </div>

          <div className="font-bold">Tel.</div>
          <div className="col-span-3"> {telValue}</div>

          <div className="font-bold">Email</div>
          <div className="col-span-3"> {emailValue}</div>
        </div>
      </Modal>
    </div>
  );
}

export default FormInput;
