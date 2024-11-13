--Crear las Tablas

-- Tabla persona
CREATE TABLE persona (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    paterno VARCHAR(255),
    materno VARCHAR(255)
);

-- Tabla telefono
CREATE TABLE telefono (
    id INT AUTO_INCREMENT PRIMARY KEY,
    persona_id INT,
    telefono VARCHAR(255),
    FOREIGN KEY (persona_id) REFERENCES persona(id)
);

-- Tabla direccion
CREATE TABLE direccion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    persona_id INT,
    calle VARCHAR(255),
    numero_exterior VARCHAR(255),
    numero_interior VARCHAR(255),
    colonia VARCHAR(255),
    cp VARCHAR(255),
    FOREIGN KEY (persona_id) REFERENCES persona(id)
);



-- Crear el Procedimiento Almacenado:
DELIMITER $$

CREATE PROCEDURE sp_process_personas()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE v_nombre VARCHAR(255);
    DECLARE v_paterno VARCHAR(255);
    DECLARE v_materno VARCHAR(255);
    DECLARE v_telefono VARCHAR(255);
    DECLARE v_calle VARCHAR(255);
    DECLARE v_numero_exterior VARCHAR(255);
    DECLARE v_numero_interior VARCHAR(255);
    DECLARE v_colonia VARCHAR(255);
    DECLARE v_cp VARCHAR(255);

    DECLARE cur CURSOR FOR 
        SELECT nombre, paterno, materno, telefono, calle, numero_exterior, numero_interior, colonia, cp
        FROM temp_personas;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN cur;

    read_loop: LOOP
        FETCH cur INTO v_nombre, v_paterno, v_materno, v_telefono, v_calle, v_numero_exterior, v_numero_interior, v_colonia, v_cp;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Insertar en la tabla persona
        INSERT INTO persona (nombre, paterno, materno)
        VALUES (v_nombre, v_paterno, v_materno);

        -- Obtener el id de la persona recién insertada
        SET @persona_id = LAST_INSERT_ID();

        -- Insertar los teléfonos
        INSERT INTO telefono (persona_id, telefono)
        VALUES (@persona_id, v_telefono);

        -- Insertar las direcciones
        INSERT INTO direccion (persona_id, calle, numero_exterior, numero_interior, colonia, cp)
        VALUES (@persona_id, v_calle, v_numero_exterior, v_numero_interior, v_colonia, v_cp);
    END LOOP;

    CLOSE cur;
END $$

DELIMITER ;



-- Crear el Procedimiento Almacenado en MySQL
-- Tabla persona
CREATE TABLE persona (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    paterno VARCHAR(255),
    materno VARCHAR(255)
);

-- Tabla telefono
CREATE TABLE telefono (
    id INT AUTO_INCREMENT PRIMARY KEY,
    persona_id INT,
    telefono VARCHAR(255),
    FOREIGN KEY (persona_id) REFERENCES persona(id)
);

-- Tabla direccion
CREATE TABLE direccion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    persona_id INT,
    calle VARCHAR(255),
    numero_exterior VARCHAR(255),
    numero_interior VARCHAR(255),
    colonia VARCHAR(255),
    cp VARCHAR(255),
    FOREIGN KEY (persona_id) REFERENCES persona(id)
);


-- Crear el Procedimiento Almacenado
DELIMITER $$

CREATE PROCEDURE sp_process_personas()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE v_nombre VARCHAR(255);
    DECLARE v_paterno VARCHAR(255);
    DECLARE v_materno VARCHAR(255);
    DECLARE v_telefono VARCHAR(255);
    DECLARE v_calle VARCHAR(255);
    DECLARE v_numero_exterior VARCHAR(255);
    DECLARE v_numero_interior VARCHAR(255);
    DECLARE v_colonia VARCHAR(255);
    DECLARE v_cp VARCHAR(255);
    DECLARE v_persona_id INT;

    -- Definir un cursor para iterar sobre la tabla temporal
    DECLARE cur CURSOR FOR 
        SELECT nombre, paterno, materno, telefono, calle, numero_exterior, numero_interior, colonia, cp
        FROM temp_personas;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    -- Abrir el cursor
    OPEN cur;

    -- Bucle para leer cada fila de la tabla temporal
    read_loop: LOOP
        FETCH cur INTO v_nombre, v_paterno, v_materno, v_telefono, v_calle, v_numero_exterior, v_numero_interior, v_colonia, v_cp;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Verificar si la persona ya existe en la tabla persona
        SET v_persona_id = NULL;
        SELECT id INTO v_persona_id
        FROM persona
        WHERE nombre = v_nombre AND paterno = v_paterno AND materno = v_materno
        LIMIT 1;

        -- Si la persona no existe, insertarla
        IF v_persona_id IS NULL THEN
            INSERT INTO persona (nombre, paterno, materno)
            VALUES (v_nombre, v_paterno, v_materno);
            SET v_persona_id = LAST_INSERT_ID();
        END IF;

        -- Insertar el teléfono en la tabla telefono
        INSERT INTO telefono (persona_id, telefono)
        VALUES (v_persona_id, v_telefono);

        -- Insertar la dirección en la tabla direccion
        INSERT INTO direccion (persona_id, calle, numero_exterior, numero_interior, colonia, cp)
        VALUES (v_persona_id, v_calle, v_numero_exterior, v_numero_interior, v_colonia, v_cp);
    END LOOP;

    -- Cerrar el cursor
    CLOSE cur;
END $$

DELIMITER ;


-- Crear la Sección de Consulta en React
-- Crear el procedimiento

DELIMITER $$

CREATE PROCEDURE sp_get_personas_paginated(IN page INT, IN per_page INT)
BEGIN
    SET @offset = (page - 1) * per_page;
    SET @limit = per_page;

    SELECT p.id, p.nombre, p.paterno, p.materno
    FROM persona p
    ORDER BY p.id
    LIMIT @offset, @limit;
END $$

DELIMITER ;
