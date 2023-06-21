'use client';
import { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from '@/redux/store';
import { FormData, resetFormData, selectFormData, setFormData } from '@/redux/slices/form';
import { ApiResponse, getCurrencyList, getPairCourse } from '@/utilities/utilities';
import styles from './ConverterForm.module.scss';

const ConverterForm = ({ ratesData }: { ratesData: ApiResponse | string }) => {
  const formReduxData = useSelector(selectFormData);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldUnregister: false,
    defaultValues: {
      fromCurrency: formReduxData.fromCurrency,
      amount: formReduxData.amount,
      toCurrency: formReduxData.toCurrency,
    },
  });
  const [convertedResult, setConvertedResult] = useState(0);

  const myHandleSubmit: SubmitHandler<FormData> = async (submitData) => {
    if (submitData.fromCurrency && submitData.toCurrency) {
      const rate = await getPairCourse(submitData.fromCurrency, submitData.toCurrency);

      if (typeof rate !== 'string' && submitData.amount && rate.conversion_rate) {
        const result = submitData.amount * rate.conversion_rate;
        setConvertedResult(result);
        dispatch(setFormData({ result: result }));
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.name) {
      dispatch(setFormData({ [e.target.name]: e.target.value }));
    }
  };

  const handleReset = () => {
    dispatch(resetFormData());
    setConvertedResult(0);
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(myHandleSubmit)} onReset={handleReset}>
      <div className={styles.currency_block}>
        <label className={styles.label}>
          From currency:
          <select
            {...register('fromCurrency', {
              required: true,
            })}
            onChange={(e) => handleChange(e)}
          >
            {typeof ratesData !== 'string' && getCurrencyList(ratesData)}
          </select>
        </label>
        <input
          type="number"
          {...register('amount', {
            required: true,
            validate: (value) => {
              if (value && value <= 0) {
                return 'Number must be greater than 0';
              }
              return true;
            },
          })}
          onChange={(e) => handleChange(e)}
        ></input>
        {errors.amount && <div>{errors.amount.message}</div>}
      </div>
      <div className={styles.currency_block}>
        <label className={styles.label}>
          To currency:
          <select
            {...register('toCurrency', {
              required: true,
            })}
            onChange={(e) => handleChange(e)}
          >
            {typeof ratesData !== 'string' && getCurrencyList(ratesData)}
          </select>
        </label>
        <input
          type="number"
          {...register('result')}
          onChange={(e) => handleChange(e)}
          value={convertedResult || formReduxData.result || 0}
          readOnly
        ></input>
      </div>
      <div className={styles.buttons_container}>
        <input type="submit" value="Submit" />
        <input type="reset" value="Reset" />
      </div>
    </form>
  );
};

export default ConverterForm;
