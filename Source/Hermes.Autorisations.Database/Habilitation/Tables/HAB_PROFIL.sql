﻿CREATE TABLE [HABILITATION].[HAB_PROFIL] (
    [I_PROFIL] NUMERIC (8)  NOT NULL,
    [L_PROFIL] VARCHAR (50) NOT NULL,
    [C_ETAT]   CHAR (1)     NOT NULL,
    [D_DEB]    DATETIME     NULL,
    [D_FIN]    DATETIME     NULL,
    CONSTRAINT [PK_T_PROFIL] PRIMARY KEY CLUSTERED ([I_PROFIL] ASC)
)
