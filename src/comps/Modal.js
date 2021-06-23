import { motion } from "framer-motion";

export const Modal = ({ selectedImg, setSelectedImg, data }) => {
  const handleClose = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setSelectedImg(null);
    }
  };
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="backdrop"
        onClick={handleClose}
      >
        {/* title img from api */}
        <h2 className="title-img">{data.title}</h2>
        {/* property "y" from framer-motion, not css */}
        <motion.img
          src={selectedImg}
          alt="enlarged img"
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
        />
      </motion.div>
    </div>
  );
};
