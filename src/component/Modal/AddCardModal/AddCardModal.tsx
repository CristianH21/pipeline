import React, { SetStateAction, Dispatch } from 'react'
import { useForm } from 'react-hook-form';
import { Input } from '../..';
import { useItemContext } from '../../../context/items.context';
import { setItem } from '../../../context/items.reducer';
import Modal from '../Modal'
import "./AddCardModal.css";
import { v4 as uuidv4 } from 'uuid';
import Button from '../../Button/Button';

interface Props {
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  containerId: string,
  item?: any
}

function AddCardModal(props: Props) {

  const { 
    register,
    handleSubmit,
    formState: { errors },
    setValue 
  } = useForm({mode: "onBlur"});

  const [, dispatch] = useItemContext();
  
  const onSubmit = (data: any) => {
    setTimeout(() => {
      props.setIsOpen(false);
    }, 3000);
    if (Object.keys(props.item).length > 0) {
      dispatch(setItem({
        ...props.item,
        ...data
      }, props.containerId));
    } else {
      const createItem = {
        ...data,
        id: uuidv4(),
        tags: data.tags.replace(/\s/g,'').split(",").filter(Boolean)
      }
      dispatch(setItem(createItem, props.containerId));
    }
  };

  React.useEffect(() => {
    if (props.item) {
      setValue("name", props.item.name);
      setValue("category", props.item.category);
      setValue("tags",  props.item.tags);
    }
  }, [props.item]);

  return (
    <Modal classNames='card-modal' {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <Input {...register("name", { required: true })} error={errors.name && "name is required"}/>
        
        {/* include validation with required or other standard HTML validation rules */}
        <Input {...register("category", { required: true })} error={errors.category && "category is required"}/>      
        <Input {...register("tags")} placeholder="seperate by commas"/>      
        <Button primary type="submit">submit</Button>
      </form>
    </Modal>
  )
}

export default AddCardModal