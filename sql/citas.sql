-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Abogados
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Abogados
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Abogados` DEFAULT CHARACTER SET utf8 ;
USE `Abogados` ;

-- -----------------------------------------------------
-- Table `Abogados`.`Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Abogados`.`Cliente` (
  `idCliente` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellidoPaterno` VARCHAR(45) NOT NULL,
  `apellidoMaterno` VARCHAR(45) NOT NULL,
  `telefono` INT(10) NOT NULL,
  PRIMARY KEY (`idCliente`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Abogados`.`Cubiculo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Abogados`.`Cubiculo` (
  `idCubiculo` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCubiculo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Abogados`.`Abogado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Abogados`.`Abogado` (
  `idAbogado` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellidoPaterno` VARCHAR(45) NOT NULL,
  `apellidoMaterno` VARCHAR(45) NOT NULL,
  `cargo` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idAbogado`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Abogados`.`Caso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Abogados`.`Caso` (
  `idCaso` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(100) NOT NULL,
  `cliente_idCliente` INT NOT NULL,
  `abogado_idAbogado` INT NOT NULL,
  PRIMARY KEY (`idCaso`),
  INDEX `fk_Caso_Cliente1_idx` (`cliente_idCliente` ASC) ,
  INDEX `fk_Caso_Abogado1_idx` (`abogado_idAbogado` ASC) ,
  CONSTRAINT `fk_Caso_Cliente`
    FOREIGN KEY (`cliente_idCliente`)
    REFERENCES `Abogados`.`Cliente` (`idCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Caso_Abogado`
    FOREIGN KEY (`abogado_idAbogado`)
    REFERENCES `Abogados`.`Abogado` (`idAbogado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Abogados`.`Cita`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Abogados`.`Cita` (
  `idCita` INT NOT NULL AUTO_INCREMENT,
  `fechaInicio` DATETIME NOT NULL,
  `fechaFin` DATETIME NOT NULL,
  `motivo` VARCHAR(45) NOT NULL,
  `estado` ENUM('cancelada', 'enCurso', 'concluida', 'programada') NOT NULL,
  `cubiculo_idCubiculo` INT NOT NULL,
  `caso_idCaso` INT NULL,
  `abogado_idAbogado` INT NOT NULL,
  `cliente_idCliente` INT NOT NULL,
  PRIMARY KEY (`idCita`),
  INDEX `fk_Cita_Cubiculo1_idx` (`cubiculo_idCubiculo` ASC) ,
  INDEX `fk_Cita_Caso1_idx` (`caso_idCaso` ASC) ,
  INDEX `fk_Cita_Abogado1_idx` (`abogado_idAbogado` ASC) ,
  INDEX `fk_Cita_Cliente1_idx` (`cliente_idCliente` ASC) ,
  CONSTRAINT `fk_Cita_Cubiculo`
    FOREIGN KEY (`cubiculo_idCubiculo`)
    REFERENCES `Abogados`.`Cubiculo` (`idCubiculo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cita_Caso`
    FOREIGN KEY (`caso_idCaso`)
    REFERENCES `Abogados`.`Caso` (`idCaso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cita_Abogado`
    FOREIGN KEY (`abogado_idAbogado`)
    REFERENCES `Abogados`.`Abogado` (`idAbogado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cita_Cliente`
    FOREIGN KEY (`cliente_idCliente`)
    REFERENCES `Abogados`.`Cliente` (`idCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Abogados`.`Documento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Abogados`.`Documento` (
  `idDocumento` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(45) NOT NULL,
  `rubro` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(250) NOT NULL,
  `caso_idCaso` INT NOT NULL,
  PRIMARY KEY (`idDocumento`),
  INDEX `fk_documento_Caso1_idx` (`caso_idCaso` ASC) ,
  CONSTRAINT `fk_documento_Caso1`
    FOREIGN KEY (`caso_idCaso`)
    REFERENCES `Abogados`.`Caso` (`idCaso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
