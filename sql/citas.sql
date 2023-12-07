-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema abogados
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema abogados
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `abogados` DEFAULT CHARACTER SET utf8 ;
USE `abogados` ;

-- -----------------------------------------------------
-- Table `abogados`.`abogado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `abogados`.`abogado` (
  `idAbogado` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellidoPaterno` VARCHAR(45) NOT NULL,
  `apellidoMaterno` VARCHAR(45) NOT NULL,
  `cargo` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idAbogado`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `abogados`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `abogados`.`cliente` (
  `idCliente` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellidoPaterno` VARCHAR(45) NOT NULL,
  `apellidoMaterno` VARCHAR(45) NOT NULL,
  `telefono` BIGINT(10) NOT NULL,
  `domicilio` VARCHAR(255) NOT NULL,
  `rfc` VARCHAR(45) NOT NULL,
  `correo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCliente`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `abogados`.`caso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `abogados`.`caso` (
  `idCaso` INT(11) NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(100) NOT NULL,
  `cliente_idCliente` INT(11) NOT NULL,
  `abogado_idAbogado` INT(11) NOT NULL,
  `nombre_demandado` VARCHAR(45) NOT NULL,
  `estado` ENUM('activo', 'inactivo', 'completo') NOT NULL,
  `fecha_comienzo` DATETIME NOT NULL,
  `fecha_cierre` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`idCaso`),
  INDEX `fk_Caso_Cliente1_idx` (`cliente_idCliente` ASC) VISIBLE,
  INDEX `fk_Caso_Abogado1_idx` (`abogado_idAbogado` ASC) VISIBLE,
  CONSTRAINT `fk_Caso_Abogado`
    FOREIGN KEY (`abogado_idAbogado`)
    REFERENCES `abogados`.`abogado` (`idAbogado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Caso_Cliente`
    FOREIGN KEY (`cliente_idCliente`)
    REFERENCES `abogados`.`cliente` (`idCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `abogados`.`cubiculo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `abogados`.`cubiculo` (
  `idCubiculo` INT(11) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCubiculo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `abogados`.`cita`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `abogados`.`cita` (
  `idCita` INT(11) NOT NULL AUTO_INCREMENT,
  `fechaInicio` DATETIME NOT NULL,
  `fechaFin` DATETIME NOT NULL,
  `motivo` VARCHAR(45) NOT NULL,
  `estado` ENUM('cancelada', 'enCurso', 'concluida', 'programada') NOT NULL,
  `cubiculo_idCubiculo` INT(11) NOT NULL,
  `caso_idCaso` INT(11) NULL DEFAULT NULL,
  `abogado_idAbogado` INT(11) NOT NULL,
  `cliente_idCliente` INT(11) NOT NULL,
  PRIMARY KEY (`idCita`),
  INDEX `fk_Cita_Cubiculo1_idx` (`cubiculo_idCubiculo` ASC) VISIBLE,
  INDEX `fk_Cita_Caso1_idx` (`caso_idCaso` ASC) VISIBLE,
  INDEX `fk_Cita_Abogado1_idx` (`abogado_idAbogado` ASC) VISIBLE,
  INDEX `fk_Cita_Cliente1_idx` (`cliente_idCliente` ASC) VISIBLE,
  CONSTRAINT `fk_Cita_Abogado`
    FOREIGN KEY (`abogado_idAbogado`)
    REFERENCES `abogados`.`abogado` (`idAbogado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cita_Caso`
    FOREIGN KEY (`caso_idCaso`)
    REFERENCES `abogados`.`caso` (`idCaso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cita_Cliente`
    FOREIGN KEY (`cliente_idCliente`)
    REFERENCES `abogados`.`cliente` (`idCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cita_Cubiculo`
    FOREIGN KEY (`cubiculo_idCubiculo`)
    REFERENCES `abogados`.`cubiculo` (`idCubiculo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `abogados`.`documento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `abogados`.`documento` (
  `idDocumento` INT(11) NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(45) NOT NULL,
  `rubro` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(250) NOT NULL,
  `caso_idCaso` INT(11) NOT NULL,
  PRIMARY KEY (`idDocumento`),
  INDEX `fk_documento_Caso1_idx` (`caso_idCaso` ASC) VISIBLE,
  CONSTRAINT `fk_documento_Caso1`
    FOREIGN KEY (`caso_idCaso`)
    REFERENCES `abogados`.`caso` (`idCaso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `abogados`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `abogados`.`usuario` (
  `idUsuario` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `contrasenia` VARCHAR(45) NULL DEFAULT NULL,
  `idAbogado` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE INDEX `idusuario_UNIQUE` (`idUsuario` ASC) VISIBLE,
  INDEX `fk_usuario_abogado_idx` (`idAbogado` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_abogado`
    FOREIGN KEY (`idAbogado`)
    REFERENCES `abogados`.`abogado` (`idAbogado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
