const LocationForm = () => {
  return (
    <form
    // onSubmit={handleSubmit(onSubmitHandler)}
    // className="d-flex align-items-center"
    >
      <input
        // {...register("floors", { required: true })}
        id="city"
        type="text"
        placeholder="Please enter a city name"
        // className="form-control"
      />
      {/* {errors.floors && <p className="text-danger">{errors.floors.message}</p>} */}
      <button>Select city</button>
    </form>
  );
};

export default LocationForm;
